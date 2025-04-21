import React from "react";
import { useForm } from "react-hook-form";
import WelcomeEmail from "../components/templates/WelcomeEmail";

const WelcomeEmailPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <main className="w-full min-h-[100vh] flex justify-around items-center bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded flex flex-col border-amber-50 bg-white w-[30vw] p-4"
      >
        <h1 className="m-2 font-bold text-2xl">Welcome Email</h1>
        <input
        {...register("name", {
          required: "Name is required"
        })}
          type="text"
          placeholder="Name"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        <input
          type="text"
          placeholder="Login Link"
          className="p-2 outline-none m-2 border-1 rounded"
        />

        <button className="ml-auto mr-2 bg-blue-300 p-2 px-4 rounded">
          Send Email
        </button>
      </form>
      <section>{/* <WelcomeEmail /> */}</section>
    </main>
  );
};

export default WelcomeEmailPage;
