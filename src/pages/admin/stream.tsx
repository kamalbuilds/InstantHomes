import { useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { StreamrClient } from 'streamr-client';
import {
    Checkbox,
    Flex,
    Spacer,
  } from "@chakra-ui/react";

const MyComponent = () => {

    const [id, setId] = useState("");
    const client = new StreamrClient();
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState("");
    const [allowPublic, setAllowPublic] = useState(false);
    const [streams, setStreams] = useState([]);


    const handleCreateStream = async (id : any) => {
        const stream = await client.createStream({
            id: id
        });

        console.log("Stream created:", stream.id);
        await client.destroy();
        return stream.id;
     };

  const handleStreamSearch = async () => {
    console.log(user,allowPublic,"fg");
    const searchParams = { user, allowPublic };
    const streams = await client.searchStreams(keyword, searchParams);
    console.log(streams,"hi");
    await client.destroy();
    // setStreams(streams);
  };

  const handleSubmit = ( e :any) => {
    e.preventDefault();
    handleCreateStream(id);
  };
  const handleSubmitsearch = ( e :any) => {
    e.preventDefault();
    handleStreamSearch();
  };

  return (
    <>
        <Flex direction="column" justify="center" align="center" mt={8}>
        <form onSubmit={handleSubmit} style={{padding: "16px"}}>
            <FormControl id="stream-id" isRequired>
            <FormLabel>Stream ID</FormLabel>
            <Input
                value={id}
                onChange={(event) => setId(event.target.value)}
                placeholder="Enter Stream ID"
            />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
                Create Stream
            </Button>
        </form>

        <form onSubmit={handleSubmitsearch} style={{padding: "16px"}}>
            <FormControl id="keyword" isRequired>
            <FormLabel>Keyword</FormLabel>
            <Input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Enter Keyword"
            />
            </FormControl>
            <FormControl id="user">
            <FormLabel>User</FormLabel>
            <Input
                value={user}
                onChange={(event) => setUser(event.target.value)}
                placeholder="Enter User Address"
            />
            </FormControl>
            <Flex align="center" mt={4}>
            <Checkbox
                isChecked={allowPublic}
                onChange={(event) => setAllowPublic(event.target.checked)}
            >
                Allow Public
            </Checkbox>
            <Spacer />
            <Button type="submit" colorScheme="blue">
                Search Streams
            </Button>
            </Flex>
            {streams.length > 0 && (
            <Flex direction="column" mt={4}>
                <FormLabel>Search Results:</FormLabel>
                {streams.map((stream) => (
                <div key={stream.id}>{stream.id}</div>
                ))}
            </Flex>
            )}
        </form>
        </Flex>

    </>
  );
};

export default MyComponent;
