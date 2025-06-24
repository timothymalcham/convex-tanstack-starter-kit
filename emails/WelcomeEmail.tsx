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
  Button,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  email: string;
  name?: string;
}

export const WelcomeEmail = ({
  email = "user@example.com",
  name,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Convex TanStack Starter!</Preview>
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="mx-auto my-10 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-8">
            <Heading className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Welcome to Convex TanStack Starter! 🎉
            </Heading>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              {name ? `Hi ${name}!` : "Hi there!"}
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              Congratulations! Your email has been successfully verified and your account is now active. 
              You're all set to start exploring everything Convex TanStack Starter has to offer.
            </Text>
            
            <Section className="text-center my-6">
              <Button
                href="http://localhost:3000"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium no-underline"
              >
                Get Started
              </Button>
            </Section>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              Here are a few things you can do next:
            </Text>
            
            <ul className="text-gray-700 text-base leading-6 mb-6 pl-6">
              <li className="mb-2">• Complete your profile</li>
              <li className="mb-2">• Explore the dashboard</li>
              <li className="mb-2">• Check out our documentation</li>
              <li className="mb-2">• Join our community</li>
            </ul>
            
            <Text className="text-gray-700 text-base leading-6 mb-6">
              If you have any questions or need help getting started, don't hesitate to reach out to our support team.
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

export default WelcomeEmail;