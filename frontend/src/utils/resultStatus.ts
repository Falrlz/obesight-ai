/**
 * Centralised mapping from a weight/BMI category string to the visual status
 * theme used across the Result page. Keeping this in one place guarantees the
 * hero, the BMI gauge, and the badges always speak the same visual language.
 *
 * "Normal" is intentionally tied to the brand `secondary` green so that a
 * healthy outcome reinforces the Obesight identity; the caution/high-risk
 * states use restrained semantic accents (amber / rose / sky) purely because a
 * health result is one of the few places where status colour aids usability.
 */
export type RiskKey = 'underweight' | 'normal' | 'overweight' | 'obesity';

export interface StatusTheme {
  key: RiskKey;
  /** Human-readable risk level in Indonesian. */
  riskLabel: string;
  /** Foreground/text colour utility class. */
  text: string;
  /** Subtle filled background utility class (for badges). */
  bg: string;
  /** Border colour utility class. */
  border: string;
  /** Very soft panel background utility class. */
  soft: string;
  /** Hex colour for SVG strokes/fills. */
  stroke: string;
}

export function getStatusTheme(category: string): StatusTheme {
  const c = (category || '').toLowerCase();

  if (
    c.includes('kurang') ||
    c.includes('insufficient') ||
    c.includes('underweight') ||
    c.includes('kurus')
  ) {
    return {
      key: 'underweight',
      riskLabel: 'Perlu Perhatian',
      text: 'text-sky-700',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      soft: 'bg-sky-500/[0.06]',
      stroke: '#0284c7',
    };
  }

  if (c.includes('normal') || c.includes('ideal')) {
    return {
      key: 'normal',
      riskLabel: 'Risiko Rendah',
      text: 'text-secondary',
      bg: 'bg-secondary/[0.08]',
      border: 'border-secondary/25',
      soft: 'bg-secondary/[0.04]',
      stroke: '#065f46',
    };
  }

  if (c.includes('lebih') || c.includes('overweight')) {
    return {
      key: 'overweight',
      riskLabel: 'Risiko Sedang',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      soft: 'bg-amber-500/[0.06]',
      stroke: '#d97706',
    };
  }

  return {
    key: 'obesity',
    riskLabel: 'Risiko Tinggi',
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    soft: 'bg-rose-500/[0.06]',
    stroke: '#e11d48',
  };
}
