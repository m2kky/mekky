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
    Link,
    Img,
    Tailwind,
} from '@react-email/components';

interface WorkshopConfirmationProps {
    name: string;
    workshopTitle?: string;
    subtitle?: string;
    date?: string;
    time?: string;
    mode?: string;
    posterUrl?: string;
}

export const WorkshopConfirmation = ({
    name,
    workshopTitle = 'The Shopify Architect',
    subtitle = 'Data-Driven Ecommerce Ecosystem',
    date = 'Limited seats available now',
    time = 'Live online sessions + practical implementation',
    mode = '100% Free Enrollment',
    posterUrl,
}: WorkshopConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>You are registered for {workshopTitle}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[560px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Registration Confirmed
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">Hi {name},</Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            You are now enrolled in <strong>{workshopTitle}</strong>.
                        </Text>

                        <Container className="bg-[#f8fafc] border border-solid border-[#e2e8f0] rounded p-[16px] my-[16px]">
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                <strong>Program:</strong> {subtitle}
                            </Text>
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                <strong>Status:</strong> {mode}
                            </Text>
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                <strong>Start window:</strong> {date}
                            </Text>
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                <strong>Format:</strong> {time}
                            </Text>
                        </Container>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Your personalized poster is ready. You can share it directly on your social media channels.
                        </Text>

                        {posterUrl && (
                            <>
                                <Container className="text-center my-[24px]">
                                    <Img src={posterUrl} alt="Your Program Poster" width="420" className="mx-auto rounded" />
                                </Container>
                                <Container className="text-center mb-[24px]">
                                    <Link
                                        href={posterUrl}
                                        className="bg-[#d97706] rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                                    >
                                        Open Your Poster
                                    </Link>
                                </Container>
                            </>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">See you inside.</Text>

                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
                            Muhammed Mekky - Marketing Automation Strategist
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WorkshopConfirmation;
