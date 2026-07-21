'use client';

export default function WaitlistWizard({ onActivate }: { active: boolean; onActivate: () => void }) {
  return <button type="button" onClick={onActivate}>سجّل اهتمامك</button>;
}
