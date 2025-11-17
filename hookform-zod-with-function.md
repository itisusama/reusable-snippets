# Step 1

Install the following libraries (you can use npm install)
```
pnpm add react-hook-form zod @hookform/resolvers
```
The provided code is an example registration page.

```tsx
"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterSchema } from "@/lib/zod-schema";
import { registerUser } from "@/functions/auth";
import { Modal } from "../Modal";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null)

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    const success = await registerUser(values);
    if (success) {
    form.reset();
    setOpenKey("registerOtpModal");
  }
  }

  return (
    <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                  />
                </FormControl>
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retype password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Retype password"
                  />
                </FormControl>
                <button
                  type="button"
                  aria-label="Toggle confirm password visibility"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </div>
      </form>
    </Form>
    <Modal modalKey="registerOtpModal" openKey={openKey} setOpenKey={setOpenKey} />
    </>
  );
}
```
Export your schema from a separate file.

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgetSchema = z.infer<typeof forgetSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
```

When we look at 

```tsx
async function onSubmit(values: RegisterSchema) {
    const success = await registerUser(values);
    if (success) {
    form.reset();
    setOpenKey("registerOtpModal");
  }
  }
```
It calls an await registerUser(values); which is getting from auth.ts function. (export your functions)

```ts
import { ForgetSchema, LoginSchema, RegisterSchema } from "@/lib/zod-schema"

export const registerUser = async (values: RegisterSchema) => {
    console.log("Register Paylod from function:", values);
    return true;
}
export const loginUser = async (values: LoginSchema) => {
    console.log("Login Paylod from function:", values);
}
export const forgetPassword = async (values: ForgetSchema) => {
    console.log("Forget Paylod from function:", values);
    return true;
}
```

return the values true to navigate or do any other stuff. (when we add the api's it will be status true then the Dynamic Modal will be opened)
