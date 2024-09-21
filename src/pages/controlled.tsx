/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable func-names */
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import { yupSchema, IFormDataYup } from "../utils/schema";
import { countryNames, emptyFormData, emptyImage } from "../utils/formdata";
import { useAppDispatch } from "../redux/hooks";
import { add } from "../redux/store/submitsSlice";
import Wrapper from "../wrapper";

function Controlled() {
  const navigate = useNavigate();
  const schema = yupSchema();
  const dispatch = useAppDispatch();
  YupPassword(yup);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormDataYup>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormDataYup> = (data) => {
    const valueFields = data;
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
      reset();
      navigate("/");
    };
  };

  return (
    <Wrapper>
      <div className="page-form">
        <h2>Controlled Form</h2>
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="field">
            <label htmlFor="name">
              <div className="label-name">Name:</div>
              <input
                placeholder={emptyFormData.name}
                id="name"
                type="text"
                className="input-text"
                {...register("name")}
              />
            </label>
            <div className="error-message">{errors.name?.message}</div>
          </div>

          <div className="field">
            <label htmlFor="age">
              <div className="label-name">Age:</div>
              <input
                id="age"
                type="number"
                placeholder={emptyFormData.age.toString()}
                className="input-text"
                {...register("age")}
              />
            </label>
            <div className="error-message">{errors.age?.message}</div>
          </div>

          <div className="field">
            <label htmlFor="email">
              <div className="label-name">Email:</div>
              <input
                id="email"
                type="email"
                placeholder={emptyFormData.email}
                className="input-text"
                {...register("email")}
              />
            </label>
            <div className="error-message">{errors.email?.message}</div>
          </div>

          <div className="field">
            <label htmlFor="password">
              <div className="label-name">Password:</div>
              <input
                id="password"
                type="password"
                placeholder={emptyFormData.password}
                className="input-text"
                {...register("password")}
              />
            </label>
            <div className="error-message error-password">
              {errors.password?.message}
            </div>
          </div>

          <div className="field">
            <label htmlFor="passwordConfirm">
              <div className="label-name">Password Confirm :</div>
              <input
                id="passwordConfirm"
                type="password"
                placeholder={emptyFormData.password}
                className="input-text"
                {...register("passwordConfirm")}
              />
            </label>
            <div className="error-message">
              {errors.passwordConfirm?.message}
            </div>
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
                size={10}
                autoComplete="off"
                placeholder="country"
                className="input-text"
                {...register("country")}
              />
            </label>
            <div className="error-message">{errors.country?.message}</div>
          </div>

          <div className="field">
            <label htmlFor="image">
              <div className="label-name">Picture:</div>
              <input
                id="image"
                type="file"
                className="input-text"
                {...register("image")}
              />
            </label>
            <div className="error-message">{errors.image?.message}</div>
          </div>

          <div className="field">
            <div className="label">
              <div className="label-name">Gender:</div>
              <label htmlFor="gender-male">
                Male
                <input
                  defaultChecked
                  type="radio"
                  value="male"
                  id="gender-male"
                  {...register("gender")}
                />
              </label>
              <label htmlFor="gender-female">
                Female
                <input
                  type="radio"
                  value="female"
                  id="gender-female"
                  {...register("gender")}
                />
              </label>
            </div>
            <div className="error-message">{errors.gender?.message}</div>
          </div>

          <div className="field">
            <label htmlFor="acceptTerms">
              <div className="label-name">Terms & Conditions:</div>
              <input
                id="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
              />
            </label>
            <div className="error-message">{errors.acceptTerms?.message}</div>
          </div>

          <button
            disabled={!isValid}
            className="link submit"
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </Wrapper>
  );
}

export default Controlled;
