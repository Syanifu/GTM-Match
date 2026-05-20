import { Resend } from 'resend';
import type { Band, Dimension } from '@/types';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

interface ReportEmailParams {
  to: string;
  name: string;
  total: number;
  band: Band;
  dimensions: Record<Dimension, number>;
  gaps: Dimension[];
  resultUrl: string;
}

const DIMENSION_LABELS: Record<Dimension, string> = {
  empathy: 'Developer Empathy',
  gtm: 'GTM for Developer Tools',
  content: 'Content & Community',
  technical: 'Technical Depth',
  credibility: 'Credibility Signals',
};

export async function sendReportEmail(params: ReportEmailParams) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'GTM Match <hello@gtmmatch.com>';

  const dimensionRows = (Object.entries(params.dimensions) as [Dimension, number][])
    .map(
      ([dim, score]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #222">${DIMENSION_LABELS[dim]}</td><td style="padding:8px 12px;border-bottom:1px solid #222;text-align:right;color:#00E0FF">${score}%</td></tr>`
    )
    .join('');

  const gapList = params.gaps
    .map((g) => `<li style="margin:4px 0">${DIMENSION_LABELS[g]}</li>`)
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0A0A0B;color:#EDEDEF;font-family:system-ui,sans-serif;padding:32px">
  <div style="max-width:560px;margin:0 auto">
    <h1 style="font-family:monospace;font-weight:400;font-size:28px;margin:0 0 8px">GTM Match Report</h1>
    <p style="color:#8A8A93;margin:0 0 24px">Hi ${params.name}, here are your results.</p>
    <motion-div style="background:#101013;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:24px;margin-bottom:24px">
      <p style="font-family:monospace;font-size:64px;margin:0;color:#00E0FF">${params.total}</p>
      <p style="margin:8px 0 0;font-size:14px;color:#8A8A93">out of 100</p>
      <p style="display:inline-block;margin-top:16px;padding:6px 12px;background:rgba(0,224,255,0.15);color:#00E0FF;border-radius:6px;font-size:13px">${params.band}</p>
    </motion-div>
    <h2 style="font-family:monospace;font-weight:400;font-size:16px;margin:0 0 12px">Dimension Scores</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">${dimensionRows}</table>
    <h2 style="font-family:monospace;font-weight:400;font-size:16px;margin:0 0 12px">Top Skill Gaps</h2>
    <ul style="padding-left:20px;color:#8A8A93;margin:0 0 24px">${gapList}</ul>
    <a href="${params.resultUrl}" style="display:inline-block;background:#00E0FF;color:#0A0A0B;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:500">View Full Report</a>
  </motion-div>
</body>
</html>`;

  const resend = getResend();
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email');
    return { skipped: true };
  }

  return resend.emails.send({
    from,
    to: params.to,
    subject: `Your GTM Match score: ${params.total}/100 — ${params.band}`,
    html,
  });
}
