import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
// import Logo from './Logo.png';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Heading as='h1' size='xl' color='blue.500' mt='2rem'>InstantHomes</Heading>
			{/* <img src={Logo} alt='logo' /> */}
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
