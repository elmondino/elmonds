import Head from 'next/head';
import {useColorMode, Heading, Text, Flex, Stack} from '@chakra-ui/react';

export default function Index() {
	const {colorMode} = useColorMode();
	const colorSecondary = {
		light: 'gray.700',
		dark: 'gray.400',
	};
	return (
		<>
			<Head>
				<title>Home - Elmonds Kreslins</title>
			</Head>
			<Stack
				as='main'
				spacing={8}
				justifyContent='center'
				alignItems='flex-start'
				m='0 auto 4rem auto'
				maxWidth='700px'
				px={2}>
				<Flex
					flexDirection='column'
					justifyContent='flex-start'
					alignItems='flex-start'
					maxWidth='700px'>
					<Heading mb={2}>Hi, I'm Elmonds Kreslins</Heading>
					<Text color={colorSecondary[colorMode]}>
						I'm front end developer with for over 5 years of professional front end devlopment experience. 
					</Text>
				</Flex>
			</Stack>
		</>
	);
}
