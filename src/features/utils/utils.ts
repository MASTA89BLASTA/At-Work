import { IUser } from "models/IUser";
import React from "react";
import { activateUser, archiveUser } from "store/reducers/UserSlice";
import { setCurrentUser } from "store/reducers/UserSlice";

export const handleClear = (
  inputRef: React.RefObject<HTMLInputElement>,
  onClear?: () => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
  id?: string
) => {
  if (inputRef.current) {
    inputRef.current.value = "";
    if (onClear) onClear();
    inputRef.current.focus();
    if (onChange && id) {
      const event = {
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event, id);
    }
  }
};

export const checkFormValidity = (formData: IUser | null): string => {
  if (
    !formData ||
    Object.values(formData).some(value =>
      typeof value === "object" && value !== null
        ? Object.values(value).some(
            nestedValue =>
              typeof nestedValue === "string" && nestedValue.trim() === ""
          )
        : typeof value === "string" && value.trim() === ""
    )
  ) {
    return "Заполните все поля";
  }
  return "";
};

export const cleanPhoneNumber = (phone: string): string => {
  const clean = phone.indexOf("x");
  return clean !== -1 ? phone.substring(0, clean).trim() : phone;
};

export const handleUserAction = (
  userId: number,
  action: "archive" | "activate",
  currentUser: IUser | null,
  dispatch: any 
) => {
  if (action === "archive") {
    dispatch(archiveUser(userId));
  } else if (action === "activate") {
    dispatch(activateUser(userId));
  }

  if (currentUser?.id === userId) {
    dispatch(setCurrentUser(null));
  }
};
