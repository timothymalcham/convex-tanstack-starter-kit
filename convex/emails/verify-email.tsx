import React from "react";
import { Heading, Text } from "@react-email/components";
import { BaseEmail, styles } from "./components/base-email";

interface VerifyEmailOTPProps {
    code: string;
    brandName?: string;
    brandTagline?: string;
    brandLogoUrl?: string;
}

export default function VerifyEmailOTP({
                                      code,
                                      brandName,
                                      brandTagline,
                                      brandLogoUrl,
                                  }: VerifyEmailOTPProps) {
    return (
        <BaseEmail
            previewText="Your verification code"
            brandName={brandName}
            brandTagline={brandTagline}
            brandLogoUrl={brandLogoUrl}
        >
            <Heading style={styles.h1}>Verify your email</Heading>
            <Text style={styles.text}>
                Enter this verification code to verify your email address:
            </Text>
            <code style={styles.code}>{code}</code>
            <Text
                style={{
                    ...styles.text,
                    color: "#ababab",
                    marginTop: "14px",
                    marginBottom: "16px",
                }}
            >
                If you didn&apos;t create an account, you can safely ignore this email.
            </Text>
        </BaseEmail>
    );
}