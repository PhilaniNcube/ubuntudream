"use client"
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { ChevronsUpDownIcon } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

  const scenes = [
    {
      id: 1,
      name: "Professional"
    },
    {
      id: 2,
      name: "Casual"
    },
    {
      id: 3,
      name: "Formal"
    },
    {
      id: 4,
      name: "Glamour"
    },
    {
      id: 5,
      name: "Artistic"
    },
    {
      id: 6,
      name: "Sports"
    },
    {
      id: 7,
      name: "Clubbing"
    }
  ]


const subjects = [
  {
    id: 0,
    name: "Adolescent Male"
  },
  {
    id: 1,
    name: "Adolescent Female"
  },
  {
    id: 2,
    name: "Young Adult Male"
  },
  {
    id: 3,
    name: "Young Adult Female"
  },
  {
    id: 4,
    name: "Middle Aged Male"
  },
  {
    id: 5,
    name: "Middle Aged Female"
  },
  {
    id: 6,
    name: "Ederly Male",
  },
  {
    id: 7,
    name: "Ederly Female"
  }

]

const race = [
  {
    id: 0,
    name: "African"
  },
  {
    id: 1,
    name: "Caucasian"
  },
  {
    id: 2,
    name: "Asian"
  },
  {
    id: 3,
    name: "Pacific Islander"
  },
  {
    id: 4,
    name: "Hispanic"
  },
  {
    id: 5,
    name: "Middle Eastern"
  },
  {
    id: 6,
    name: "South Asian",
  },
  {
    id: 7,
    name: "Scandinavian"
  }

]



const PortraitForm = () => {

  const [selected, setSelected] = useState(scenes[3]);


  const [isLoading, setIsLoading] = useState(false);

    const [output, setOutput] = useState({
      text: "Placeholder",
      image: "/images/out.png",
    });

        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm<FieldValues>({
          defaultValues: {
            scene: scenes[3],
            subject: subjects[2],
            race: race[3],
          },
        });

           const onSubmit: SubmitHandler<FieldValues> = async (data) => {
             setIsLoading(true);
             console.log(data)

             const res = await fetch(`/api/portrait`, {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
             });

             if (res.status !== 200) {
               setIsLoading(false);
               setOutput({
                 ...output,
                 text: "Image generation failed please try again",
               });
               return;
             }

             const generation = await res.json();
             setOutput({
               text: data.prompt,
               image: generation.output[0],
             });
             console.log(generation);
             setIsLoading(false);
           };


  return (
    <div className="w-full px-6 lg:px-10">
      <h1 className="text-zinc-600 text-xl lg:text-3xl font-bold">
        Generate Portraits
      </h1>
      <form className="max-w-2xl mt-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <hr className="text-slate-800" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label
              htmlFor="scene"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Scene
            </label>
            <div className="mt-2">
              <select
                id="scene"
                {...register("scene", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {scenes.map((scene) => (
                  <option key={scene.id} value={scene.name}>
                    {scene.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="subject"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Age of subject
            </label>
            <div className="mt-2">
              <select
                id="subject"
                {...register("subject", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="race"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select race of subject
            </label>
            <div className="mt-2">
              <select
                id="race"
                {...register("race", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {race.map((scene) => (
                  <option key={scene.id} value={scene.name}>
                    {scene.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            disabled={isLoading}
            type="submit"
            className="w-1/2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        </div>
      </form>
      <div className="w-full mt-4">
        {isLoading && (
          <div className="h-12">
            <p className="text-lg font-bold text-zinc-700">
              Generating your image...
            </p>
          </div>
        )}
        <div className="relative group w-full lg:w-2/4 mx-auto">
          <Image
            src={output.image}
            width={500}
            height={500}
            alt="Output"
            className="w-full mx-auto aspect-square object-cover"
          />
          <p className="absolute bottom-4 left-3 text-lg group-hover:bg-slate-600/40 group-hover:text-slate-50 transition px-4 py-2 font-bold text-zinc-700 mt-4">
            {output.text}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PortraitForm;
