"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function JobGeneration() {
  return (
    <div className="flex flex-col">
      <Textarea placeholder="Paste your job description here" className="min-h-52" />
      <Button className="mt-4 ml-auto" type="submit">
        Generate Resume
      </Button>
    </div>
  );
}

export default JobGeneration;
