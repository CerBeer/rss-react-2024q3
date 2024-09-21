/* eslint-disable prefer-destructuring */
import * as yup from "yup";
import YupPassword from "yup-password";
import { countryNames } from "./formdata";

YupPassword(yup);

const MAX_FILE_SIZE = 1000000;
const fileExtensions = ["image/jpeg", "image/png"];

export const yupSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required()
      .test(
        "firstUpperCasedLetter",
        "first letter must be uppercase",
        (value) => /^[A-ZА-ЯЁ]/.test(value),
      ),
    age: yup.number().nullable().min(1).required(),
    email: yup.string().required().email(),
    password: yup
      .string()
      .password()
      .min(0)
      .minNumbers(1, "1 number")
      .minLowercase(1, "1 lowercase letter")
      .minUppercase(1, "1 uppercase letter")
      .minSymbols(1, "1 special character")
      .required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "must match with password"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "select male or female")
      .required(),
    country: yup
      .string()
      .required()
      .oneOf(countryNames, "select a country from the list"),
    image: yup
      .mixed<File>()
      .required()
      .test("fileSize", "File is too large", (file) => {
        let checkedFile = file;
        if (file.constructor.name === "FileList") {
          const checkedFileList = file as unknown as FileList;
          if (checkedFileList.length > 0) {
            checkedFile = checkedFileList[0];
          }
        }
        return checkedFile.size <= MAX_FILE_SIZE;
      })
      .test("fileType", "Unsupported file type", (file: File) => {
        let checkedFile = file;
        if (file.constructor.name === "FileList") {
          const checkedFileList = file as unknown as FileList;
          if (checkedFileList.length > 0) {
            checkedFile = checkedFileList[0];
          }
        }
        return fileExtensions.includes(checkedFile.type);
      }),
    acceptTerms: yup.boolean().isTrue().required(),
  });

export interface IFormDataYup {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: "male" | "female";
  image: File;
  country: string;
  acceptTerms: true;
}

export default yupSchema;
