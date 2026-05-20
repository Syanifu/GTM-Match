'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailGateProps {
  onSubmit: (data: {
    name: string;
    email: string;
    currentRole: string;
    targetRole: string;
  }) => void;
  loading: boolean;
}

export function EmailGate({ onSubmit, loading }: EmailGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      currentRole: currentRole.trim(),
      targetRole: targetRole.trim(),
    });
  }

  return (
    <GlassCard className="p-6 sm:p-8">
      <h2 className="text-xl">Get your report</h2>
      <p className="mt-2 text-sm text-fg-muted">
        We will email your full results and save them for sharing.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="currentRole">Current role</Label>
          <Input
            id="currentRole"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder="e.g. Product Marketing Manager"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="targetRole">Target role</Label>
          <Input
            id="targetRole"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Developer Advocate"
            className="mt-1.5"
          />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Submitting…' : 'See my results'}
        </Button>
      </form>
    </GlassCard>
  );
}
