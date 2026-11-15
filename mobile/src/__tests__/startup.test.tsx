import { render, screen } from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals';
import App from '../../App';

jest.mock(
  'react-native-safe-area-context',
  () =>
    jest.requireActual<{ default: unknown }>(
      'react-native-safe-area-context/jest/mock',
    ).default,
);

describe('First device verification screen', () => {
  it('renders the Turkish brand with accessible heading and development disclosure', async () => {
    await render(<App />);
    expect(screen.getByRole('header', { name: 'KÖK' })).toBeTruthy();
    expect(screen.getByText('Dijital Aile Mirası')).toBeTruthy();
    expect(screen.getByText(/Geliştirme sürümü/)).toBeTruthy();
  });

  it('does not claim encryption or pretend that user content is being processed', async () => {
    await render(<App />);
    expect(screen.getByText('KÖK')).toBeTruthy();
    expect(
      screen.queryByText(/256.bit|uçtan uca|taranıyor|şifreli/i),
    ).toBeNull();
    expect(screen.queryByText(/Open up App/)).toBeNull();
  });
});
