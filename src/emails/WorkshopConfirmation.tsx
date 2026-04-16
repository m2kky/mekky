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
    date?: string;
    time?: string;
    mode?: string;
    posterUrl?: string;
}

export const WorkshopConfirmation = ({
    name,
    workshopTitle = 'Shopify kick start: How to build Shopify stores',
    date = 'Tuesday, April 21, 2026',
    time = '09:00 PM Cairo Time',
    mode = 'Live Online on Google Meet',
    posterUrl,
}: WorkshopConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>You're registered for {workshopTitle}!</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[520px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            🎉 You&apos;re In!
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {name},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Your free seat for <strong>{workshopTitle}</strong> is confirmed!
                        </Text>

                        <Container className="bg-[#f8fafc] border border-solid border-[#e2e8f0] rounded p-[16px] my-[16px]">
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                📅 <strong>Date:</strong> {date}
                            </Text>
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                🕖 <strong>Time:</strong> {time}
                            </Text>
                            <Text className="text-[#334155] text-[14px] leading-[24px] m-0">
                                💻 <strong>Format:</strong> {mode}
                            </Text>
                        </Container>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We&apos;ll send you the Google Meet link closer to the event. In the meantime, share your personalized poster on social media!
                        </Text>

                        {posterUrl && (
                            <>
                                <Container className="text-center my-[24px]">
                                    <Img
                                        src={posterUrl}
                                        alt="Your Workshop Poster"
                                        width="400"
                                        className="mx-auto rounded"
                                    />
                                </Container>
                                <Container className="text-center mb-[24px]">
                                    <Link
                                        href={posterUrl}
                                        className="bg-[#ea580c] rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                                    >
                                        Download Your Poster
                                    </Link>
                                </Container>
                            </>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            See you there! 🚀
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

export default WorkshopConfirmation;
