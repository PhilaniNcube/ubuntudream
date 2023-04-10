"use client"
import { useState } from "react";
import Input from "../Inputs/Input";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import Button from "../Button";
import Image from "next/image";

const Form = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [output, setOutput] = useState({
    text: "Placeholder",
    image: "/images/out.png"
  })



    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: {
        prompt: "",
      },
    });

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        const res = await fetch(`/api/predictions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const generation = await res.json();
        setOutput({
          text: data.prompt,
          image: generation.output[0]
        })
        console.log(generation)
          setIsLoading(false);

      };


  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl text-zinc-600 font-semibold">
        Generate your image
      </h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          id="prompt"
          label="My Question"
          errors={errors}
          disabled={isLoading}
          required
          register={register}
        />
        <Button label="Generate" disabled={isLoading} type="submit" />
      </form>
      <div className="w-full mt-4">
        {isLoading && (
          <div className="h-12">
            <p className="text-lg font-bold text-zinc-700">
              Generating your image...
            </p>
          </div>
        ) }
        <Image
          src={output.image}
          width={500}
          height={500}
          alt={output.text}
          className="w-3/4 mx-auto aspect-square object-cover"
        />
        <p className="text-lg font-bold text-zinc-700 mt-4">{output.text}</p>
      </div>
    </div>
  );
};
export default Form;
