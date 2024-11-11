import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultModalProps {
  jsonData: object;
  title?: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultModal({
  isOpen,
  setIsOpen,
  jsonData,
  title = "JSON Data",
  description = "View the JSON data below",
}: ResultModalProps) {
  const formattedJson = JSON.stringify(jsonData, null, 2);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[350px] w-full rounded-md border p-4">
          <pre className="text-sm">
            <code className="language-json">{formattedJson}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
