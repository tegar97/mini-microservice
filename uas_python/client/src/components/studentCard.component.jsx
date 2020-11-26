import React from 'react'
import { Grid, GridItem,Box, Wrap, WrapItem ,Text, Button} from "@chakra-ui/react"
import { Avatar, AvatarBadge } from "@chakra-ui/react"
import {DeleteIcon,InfoIcon,EditIcon} from '@chakra-ui/icons'

function StudentCard({data,deleteAction,setCurrentId}) {
    return (
                <Box p={5   } w="100%" h="100%" bg="#fff" >
                    <div style={{textAlign: 'center'}}>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov"  size="xl"/>
                        <Text>{`${data.firstName} ${data.lastName}`}</Text>
                    </div>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4} style={{marginTop: '1rem'}}>
                    <Button w="100%" colorScheme="teal" size="md" ><EditIcon  w={6} h={6} onClick={() => setCurrentId(data.id)} /></Button>   
                    <Button w="100%" colorScheme="blue" size="md" ><InfoIcon w={6} h={6} /></Button>   
                    <Button w="100%" colorScheme="red" size="md" onClick={() => deleteAction(data.id)} ><DeleteIcon w={6} h={6} /></Button>   
                     </Grid>
            
                </Box>
           
                
           
    )
}

export default StudentCard
