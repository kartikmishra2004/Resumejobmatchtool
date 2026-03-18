import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Briefcase } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-violet-400" />
        <Label htmlFor="job-description" className="text-lg font-semibold text-zinc-100">
          Job Description
        </Label>
      </div>
      <Textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here...&#10;&#10;Example:&#10;We are looking for a Senior Full Stack Developer with 3+ years of experience in React, Node.js, and TypeScript. The ideal candidate should have strong problem-solving skills and experience with modern development practices..."
        className="min-h-[400px] bg-zinc-950 border-zinc-700 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-600 resize-none"
      />
      <p className="text-sm text-zinc-500 mt-2">
        {value.length > 0 ? `${value.length} characters` : 'Enter the complete job posting'}
      </p>
    </div>
  );
}
