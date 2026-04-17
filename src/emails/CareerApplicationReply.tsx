import * as React from 'react';
import {
    Html,
    Body,
    Head,
    Heading,
    Container,
    Preview,
    Text,
    Hr,
    Tailwind
} from '@react-email/components';

interface CareerApplicationReplyProps {
    name: string;
    track: string;
}

export const CareerApplicationReply = ({ name, track }: CareerApplicationReplyProps) => {
    return (
        <Html>
            <Head />
            <Preview>Your application has been received — Mekky Internship</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Application Received 🎉
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thanks for applying to the <strong>Mekky Internship Program</strong>! I&apos;ve received your application for the <strong>{track}</strong> track.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            I review every application personally and will get back to you within <strong>48 hours</strong> with the next steps.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            In the meantime, make sure to follow me on social media for tips and behind-the-scenes content on AI, automation, and building cool things.
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
                            Muhammed Mekky — Marketing Automation Strategist
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default CareerApplicationReply;
