import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { tr } from './src/i18n/tr';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <View style={styles.hero}>
          <View
            style={styles.emblem}
            accessible
            accessibilityLabel={tr.brand.emblem}
          >
            <View style={styles.tree}>
              <View style={styles.canopy} />
              <View style={styles.trunk} />
              <View style={styles.roots} />
            </View>
          </View>
          <Text accessibilityRole="header" style={styles.title}>
            {tr.brand.name}
          </Text>
          <Text style={styles.subtitle}>{tr.brand.subtitle}</Text>
          <View style={styles.quoteCard}>
            <Text style={styles.quote}>{tr.brand.quote}</Text>
          </View>
        </View>
        <Text style={styles.stage}>{tr.development.stage}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAF8F4', padding: 24 },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  emblem: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  tree: { height: 80, width: 80, alignItems: 'center' },
  canopy: {
    width: 56,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#4B624D',
  },
  trunk: { height: 22, width: 6, backgroundColor: '#4B624D', marginTop: -6 },
  roots: {
    width: 34,
    height: 12,
    borderTopWidth: 3,
    borderColor: '#934A32',
    borderRadius: 17,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#141E17',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B624D',
    textAlign: 'center',
  },
  quoteCard: {
    maxWidth: 320,
    borderRadius: 12,
    backgroundColor: '#EBF7EC',
    padding: 20,
  },
  quote: {
    color: '#434842',
    fontSize: 16,
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  stage: {
    color: '#434842',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
