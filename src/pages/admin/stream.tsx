import { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { StreamrClient } from 'streamr-client';
import {
    Checkbox,
    Flex,
    Spacer,
  } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

const Streams = () => {

    const [id, setId] = useState("");
    const [client,setClient] = useState(null);

    useEffect(() => {
        if(window.ethereum){
            const client = new StreamrClient({
                auth: {
                    ethereum : window.ethereum
                }
            });
            setClient(client);
        }
    }, []);
      
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState("");
    const [allowPublic, setAllowPublic] = useState(false);
    const [streams, setStreams] = useState([]);

    // publishing the stream
    const [publishStreamId, setPublishStreamId] = useState("");
    const [publishMessage, setPublishMessage] = useState("");

    // Define the interval time in milliseconds
    
    useEffect(() => {
        // Define the interval time in milliseconds
        const intervalTime = 20000;
      
        // Call the handleSubmitPublish function every 20 seconds
        const intervalId = setInterval(handleSubmitPublish, intervalTime);
      
        // Return a cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);
      


    const handleCreateStream = async (id : any) => {
        const stream = await client.createStream({
            id: id
        });

        console.log("Stream created:", stream.id);
        await client.destroy();
        return stream.id;
     };

     // search the stream
     const handleStreamSearch = async () => {
        console.log(user, allowPublic, "fg");
        const searchParams = { user, allowPublic };
        const streamIterator = client.searchStreams(keyword, searchParams);
        const streams = [];
        for await (const stream of streamIterator) {
          streams.push(stream);
        }
        console.log(streams, "hi");
        await client.destroy();
        setStreams(streams);
      };
      
      

    const handleSubmit = ( e :any) => {
        e.preventDefault();
        handleCreateStream(id);
    };
    const handleSubmitsearch = ( e :any) => {
        e.preventDefault();
        handleStreamSearch();
    };

    const handleSubmitPublish = async (e: any) => {
        e.preventDefault();
    
        // Publish the message to the specified stream
        const message = JSON.parse(publishMessage);
        await client.publish(publishStreamId, message);

        console.log("Message published to stream:", publishStreamId);
    
        // Reset the form inputs
        setPublishStreamId("");
        setPublishMessage("");
    };

    const dmsg ={
        mambai: 1000,
        delhi: 500
    }
    // dummy data publishing 
    async function publishEvery30Sec() {
        try {
          await client.publish("0x0439427c42a099e7e362d86e2bbe1ea27300f6cb/kamalthedev", dmsg, { timestamp: new Date(1546300800123) });
        } catch (error) {
          console.error('An error occurred while publishing:', error);
        }
      }
      
      setInterval(publishEvery30Sec, 30000);
      

  return (
    <>
    <AdminLayout>
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

        <form onSubmit={handleSubmitPublish} style={{ padding: "16px" }}>
        <FormControl id="stream-id" isRequired>
            <FormLabel>Stream ID</FormLabel>
            <Input
            value={publishStreamId}
            onChange={(event) => setPublishStreamId(event.target.value)}
            placeholder="Enter Stream ID"
            />
        </FormControl>
        <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Input
            value={publishMessage}
            onChange={(event) => setPublishMessage(event.target.value)}
            placeholder="Enter Message"
            />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
            Publish Message
        </Button>
        </form>

        </Flex>
        </AdminLayout>
    </>
  );
};

export default Streams;
