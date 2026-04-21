"use client";

import { CheckCircle2, Circle } from "lucide-react";

interface PasswordChecklistProps {
  passwordValue: string;
}

export function PasswordChecklist({ passwordValue }: PasswordChecklistProps) {
  const checks = [
    {
      id: "min-length",
      label: "At least 8 characters",
      isMet: passwordValue.length >= 8,
    },
    {
      id: "complexity",
      label: "One uppercase, lowercase, and digit",
      isMet: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordValue),
    },
    {
      id: "special-char",
      label: "One special character",
      isMet: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    },
  ];
  return (
    <div className="hidden md:block bg-[#E8EDFF] p-4 rounded-[12px] space-y-3  transition-all duration-300">
      {checks.map((check) => (
        <div
          key={check.id}
          className="flex items-center gap-3 transition-colors duration-200"
        >
          {check.isMet ? (
            <CheckCircle2 size={18} className="text-green-600 fill-green-50" />
          ) : (
            <Circle size={18} className="text-slate-400" />
          )}

          <span
            className={`text-[13px] leading-tight font-medium ${
              check.isMet ? "text-slate-900" : "text-slate-500"
            }`}
          >
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
}
