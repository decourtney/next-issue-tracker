'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text, TextField, Button, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import {zodResolver} from '@hookform/resolvers/zod';
import {createIssueSchema} from '@/app/validationSchemas'
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage"
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});

  return (
    <div className="max-w-xl">
      {error && 
        <Callout.Root color='red' className="mb-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      
      <form 
        className = "space-y-3" 
        onSubmit = {handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch(error) {
          setError('An unexpected error occured.')
        }
        })}
      >
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root placeholder="Title" {...register('title')} />
        
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller 
          name="description" 
          control={control} 
          render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
        />
        
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
