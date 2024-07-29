"use client"

import React, { 
  useState, 
  useEffect 
} from 'react';
import { 
  Alert, 
  AlertDescription 
} from "@/components/ui/alert";
import { MdError } from "react-icons/md";

type ErrorAlertWrapperProps = {
  error?: string;
}

export default function ErrorAlertWrapper({ 
  error 
}: ErrorAlertWrapperProps) {
  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!visible || !error) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <MdError className="w-[1.2rem] h-[1.2rem]" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};