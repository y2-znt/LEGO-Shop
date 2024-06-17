import React from "react";
import { IconType } from "react-icons/lib";
import { Button } from "./shadcn/button";

type ActionBtnType = {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // disabled: boolean;
};

export default function ActionBtn({ icon: Icon, onClick }: ActionBtnType) {
  return (
    <div>
      <Button className="bg-transparent" onClick={onClick}>
        <Icon size={20} />
      </Button>
    </div>
  );
}
