const {
  withAndroidManifest,
  withGradleProperties,
  withDangerousMod,
} = require('expo/config-plugins');
const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = function withAndroidSafety(config) {
  config = withAndroidManifest(config, (result) => {
    const application = result.modResults.manifest.application[0];
    application.$['android:allowBackup'] = 'false';
    application.$['android:usesCleartextTraffic'] = 'false';
    return result;
  });
  config = withGradleProperties(config, (result) => {
    const settings = {
      'org.gradle.jvmargs':
        '-Xmx1536m -XX:MaxMetaspaceSize=512m -Dfile.encoding=UTF-8',
      'org.gradle.parallel': 'false',
      'org.gradle.workers.max': '1',
      'org.gradle.java.installations.auto-download': 'false',
      'android.builder.sdkDownload': 'false',
      'expo.android.cmakeObjectPathMax': '200',
      reactNativeArchitectures: 'arm64-v8a',
    };
    for (const [key, value] of Object.entries(settings)) {
      const property = result.modResults.find(
        (item) => item.type === 'property' && item.key === key,
      );
      if (property) property.value = value;
      else result.modResults.push({ type: 'property', key, value });
    }
    return result;
  });
  return withDangerousMod(config, [
    'android',
    async (result) => {
      const debug = path.join(
        result.modRequest.platformProjectRoot,
        'app/src/debug',
      );
      const xmlDirectory = path.join(debug, 'res/xml');
      await fs.mkdir(xmlDirectory, { recursive: true });
      await fs.writeFile(
        path.join(xmlDirectory, 'network_security_config.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <base-config cleartextTrafficPermitted="false" />
  <domain-config cleartextTrafficPermitted="true">
    <domain>localhost</domain><domain>127.0.0.1</domain><domain>::1</domain>
  </domain-config>
</network-security-config>\n`,
      );
      const manifestPath = path.join(debug, 'AndroidManifest.xml');
      const manifest = await fs.readFile(manifestPath, 'utf8');
      if (!manifest.includes('android:networkSecurityConfig=')) {
        await fs.writeFile(
          manifestPath,
          manifest.replace(
            '<application ',
            '<application android:networkSecurityConfig="@xml/network_security_config" ',
          ),
        );
      }
      return result;
    },
  ]);
};
