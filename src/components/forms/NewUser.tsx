'use client';
/*eslint-disable*/

// Chakra imports
import {
  Box,
  Button,
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

import { API_ROUTES } from '@/route_spec';

// React imports
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'



const API_URL = process.env.API_URL;



/*
 * Helper Functions
 */


async function createUser(values: any) {

  // Collect user roles into an array
  values.roles = [];
  for (let role of ['STUDENT', 'PROFESSOR', 'TESTER']) {
    if (values['role_' + role]) {
      values.roles.push( role );
    }
    delete values['role_' + role];
  }

  try {
    const response = await fetch(
      new URL( API_ROUTES.create_user.makeURL(), API_URL ),
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    )
    if (!response.ok) {
      throw new Error(`Error: ${response}`)
    }
  }
  catch (error) {
    console.log(error)
  }
}



/*
 * New User Form Component
 */


export type NewUserFormProps = {}

export function NewUserForm(props: NewUserFormProps) {

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  // -------------- Component(s) --------------

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <Stack gap={4} direction="column">
        <FormControl>
          <FormLabel>NetID</FormLabel>
          <Input {...register('net_id')} bg="white" />
        </FormControl>

        <FormControl>
          <FormLabel>User Role(s)</FormLabel>
          <CheckboxGroup colorScheme="purple" defaultValue={['STUDENT']}>
            <Stack direction="column">
              <Checkbox {...register('role_STUDENT')}   value='STUDENT'   >Student</Checkbox>
              <Checkbox {...register('role_PROFESSOR')} value='PROFESSOR' >Professor</Checkbox>
              <Checkbox {...register('role_TESTER')}    value='TESTER'    >Tester</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          mt="32px !important"
        >
          Create
        </Button>
      </Stack>
    </form>
  );
}
