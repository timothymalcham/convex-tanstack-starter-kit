import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  resetCode: string;
  email: string;
}

export const PasswordResetEmail = ({
  resetCode = "12345678",
  email = "user@example.com",
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="mx-auto my-10 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-8">
            <Heading className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Reset your password
            </Heading>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              You recently requested to reset your password for your Convex TanStack Starter account. 
              Use the verification code below to reset your password:
            </Text>
            
            <Section className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center my-6">
              <Text className="text-3xl font-bold text-gray-900 tracking-widest font-mono m-0">
                {resetCode}
              </Text>
            </Section>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              This password reset code will expire in 10 minutes for security reasons.
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-6">
              If you didn't request a password reset, you can safely ignore this email. 
              Your password will remain unchanged.
            </Text>
            
            <div className="border-t border-gray-200 pt-6">
              <Text className="text-gray-600 text-sm leading-5 m-0">
                Best regards,<br />
                The Convex TanStack Starter Team
              </Text>
            </div>
          </div>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default PasswordResetEmail;