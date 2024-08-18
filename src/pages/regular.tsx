/* eslint-disable func-names */
import { FormEvent, useRef, useState } from "react";
import { ValidationError } from "yup";
import { Form, useNavigate } from "react-router-dom";
import { yupSchema, IFormDataYup } from "../utils/schema";
import { countryNames, emptyFormData, emptyImage } from "../utils/formdata";
import { useAppDispatch } from "../redux/hooks";
import { add } from "../redux/store/submitsSlice";
import Wrapper from "../wrapper";

function Regular() {
  const navigate = useNavigate();
  const schema = yupSchema();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const valueFields: IFormDataYup = {
      name: nameRef.current?.value ?? "",
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      passwordConfirm: passwordConfirmRef.current?.value ?? "",
      country: countryRef.current?.value ?? "",
      gender: genderMaleRef.current?.checked ? "male" : "female",
      image: imageRef.current?.files
        ? imageRef.current?.files[0]
        : new File([""], ""),
      acceptTerms: acceptTermsRef.current?.checked as true,
    };
    try {
      schema.validateSync(valueFields, { abortEarly: false });

      const reader = new FileReader();
      reader.readAsDataURL(valueFields.image);
      reader.onloadend = function () {
        const image = reader.result?.toString();

        dispatch(
          add({
            id: "",
            isRegular: true,
            formData: {
              name: valueFields.name,
              age: valueFields.age,
              email: valueFields.email,
              image: image ?? emptyImage,
              gender: valueFields.gender,
              password: valueFields.password,
              country: valueFields.country,
              acceptTerms: true,
            },
          }),
        );
        navigate("/");
      };
    } catch (error) {
      type ErrorsMap = Record<string, string>;
      if (error instanceof ValidationError) {
        const errorsMap = error.inner.reduce((res: ErrorsMap, er) => {
          const nameInput = er.path;
          if (nameInput) {
            const currentRes = res[nameInput] ?? "";
            const newError = er.message;
            if (!currentRes.includes("required")) {
              if (newError.includes("required")) {
                res[nameInput] = newError;
              } else {
                res[nameInput] = currentRes
                  ? `${currentRes}, ${er.message}`
                  : er.message;
              }
            }
          }
          return res;
        }, {});
        setErrors(errorsMap);
      }
    }
  };
  return (
    <Wrapper>
      <div className="page-form">
        <h2>Regular Form</h2>
        <Form onSubmit={onSubmit} className="form">
          <div className="field">
            <label htmlFor="name">
              <div className="label-name">Name:</div>
              <input
                placeholder={emptyFormData.name}
                id="name"
                type="text"
                ref={nameRef}
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.name}</div>
          </div>

          <div className="field">
            <label htmlFor="age">
              <div className="label-name">Age:</div>
              <input
                id="age"
                type="number"
                placeholder={emptyFormData.age.toString()}
                ref={ageRef}
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.age}</div>
          </div>

          <div className="field">
            <label htmlFor="email">
              <div className="label-name">Email:</div>
              <input
                id="email"
                type="email"
                placeholder={emptyFormData.email}
                ref={emailRef}
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.email}</div>
          </div>

          <div className="field">
            <label htmlFor="password">
              <div className="label-name">Password:</div>
              <input
                id="password"
                type="password"
                placeholder={emptyFormData.password}
                ref={passwordRef}
                className="input-text"
              />
            </label>
            <div className="error-message error-password">
              {errors?.password}
            </div>
          </div>

          <div className="field">
            <label htmlFor="passwordConfirm">
              <div className="label-name">Password Confirm :</div>
              <input
                id="passwordConfirm"
                type="password"
                placeholder={emptyFormData.password}
                ref={passwordConfirmRef}
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.passwordConfirm}</div>
          </div>

          <div className="field">
            <datalist id="countrydata">
              {countryNames.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </datalist>
            <label htmlFor="country">
              <div className="label-name">Country:</div>
              <input
                type="text"
                id="country"
                list="countrydata"
                ref={countryRef}
                size={50}
                autoComplete="off"
                placeholder="country"
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.country}</div>
          </div>

          <div className="field">
            <label htmlFor="picture">
              <div className="label-name">Picture:</div>
              <input
                id="picture"
                type="file"
                ref={imageRef}
                className="input-text"
              />
            </label>
            <div className="error-message">{errors?.image}</div>
          </div>

          <div className="field">
            <div className="label">
              <div className="label-name">Gender:</div>
              <label htmlFor="gender-male">
                Male
                <input
                  defaultChecked
                  name="gender"
                  type="radio"
                  value="male"
                  id="gender-male"
                  ref={genderMaleRef}
                />
              </label>
              <label htmlFor="gender-female">
                Female
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  id="gender-female"
                  ref={genderFemaleRef}
                />
              </label>
            </div>
            <div className="error-message">{errors?.gender}</div>
          </div>

          <div className="field">
            <label htmlFor="acceptTerms">
              <div className="label-name">Terms & Conditions:</div>
              <input id="acceptTerms" type="checkbox" ref={acceptTermsRef} />
            </label>
            <div className="error-message">{errors?.acceptTerms}</div>
          </div>

          <button className="link submit" type="submit" value="Submit">
            Submit
          </button>
        </Form>
      </div>
    </Wrapper>
  );
}

export default Regular;
