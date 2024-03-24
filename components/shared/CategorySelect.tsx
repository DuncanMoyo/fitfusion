import { startTransition, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import { Input } from "../ui/input";

type CategorySelectProps = {
  value?: string;
  onChangeHandler?: any;
};

const CategorySelect = ({ value, onChangeHandler }: CategorySelectProps) => {
  const [categories, setCategories] = useState<IFitnessEvent[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const categorySelectHandler = (event: any) => {
    setNewCategory(event.target.value);
  };

  const addCategoryHandler = () => {};

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map(({ title, _id }, idx) => (
            <SelectItem key={idx} value={_id}>
              {title}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="flex w-full rounded-sm py-3 pl-8">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category Name"
                  onChange={categorySelectHandler}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(addCategoryHandler)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
