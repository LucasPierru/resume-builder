import { Control, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Resume } from "@/validation/resume";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRef } from "react";

function SkillsSection({ control }: { control: Control<Resume> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skills`,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddSkill = () => {
    const skillValue = inputRef.current?.value.trim();
    if (inputRef.current && skillValue) {
      append({ text: skillValue });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          placeholder="Enter a skill"
          className="w-fit"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddSkill();
            }
          }}
        />
        <Button type="button" onClick={handleAddSkill}>
          Add Skill
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {fields.map((input, index) => (
          <div key={input.id} className="flex items-center bg-secondary w-fit h-fit py-1 px-2 rounded-full gap-1">
            <span className="font-bold">{input.text}</span>
            <Button type="button" variant="ghost" size="icon" className="w-4 h-4" onClick={() => remove(index)}>
              <XIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
