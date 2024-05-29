import { Link } from 'react-router-dom';
import { Button as ButtonPrimary, Box, Spinner, DataList, Badge, Flex, Card, TextField, Heading, Text, Separator } from '@radix-ui/themes';
import React, { useState, useEffect} from 'react';
import { DataTable } from "./Table";
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "./components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./components/ui/alert-dialog"
import axios from 'axios';

export const LandingPage = (props) => {
    const { session } = props;
    const [ eventName, setEventName ] = useState('');
    const [ activeUserID, setActiveUserID ] = useState('');
    const [ eventData, setEventData ] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    // const sampleData = {
    //     "meetings": [
    //         {
    //             "event_id": 1020,
    //             "event_name": "banana party",
    //             "created": "2024-05-28T08:20:34.893Z",
    //             "user_id": 16,
    //             "is_active": true
    //         },
    //         {
    //             "event_id": 1019,
    //             "event_name": "eventCreationWorks!",
    //             "created": "2024-05-28T06:55:46.850Z",
    //             "user_id": 16,
    //             "is_active": true
    //         },
    //         {
    //             "event_id": 1018,
    //             "event_name": "testingEventCreation",
    //             "created": "2024-05-28T06:55:00.907Z",
    //             "user_id": 16,
    //             "is_active": true
    //         },
    //         {
    //             "event_id": 1011,
    //             "event_name": "simon crib",
    //             "created": null,
    //             "user_id": 16,
    //             "is_active": true
    //         },
    //         {
    //             "event_id": 1012,
    //             "event_name": "WAP listening party",
    //             "created": null,
    //             "user_id": 16,
    //             "is_active": true
    //         }
    //     ],
    //     "userId": 16
    // };

    const fetchData = async () => {
        try {
            const res = await axios.get(`${window.location.origin}/user/past-events`);
            console.log(res.data);
            if (res && res.data && res.data.meetings && res.data.userId) {
                setEventData(res.data.meetings);
                setActiveUserID(res.data.userId);
            } else {
                throw new Error('Returned event data is incomplete');
            }
            // setEventData(sampleData.meetings);
            // setActiveUserID(sampleData.userId);
        } catch (error) {
            console.log(error);
        }
    };

    const removeEvent = async (eventNomenclature, userWhoIsActive) => {
        try {
            if (activeUserID !== '') {
                await axios.post(`${window.location.origin}/event/delete`, {
                    eventName: eventNomenclature,
                    user_id: userWhoIsActive,
                }).then(() => {
                    fetchData();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addEvent = async () => {
        try {
            if (activeUserID !== '') {
                await axios.post(`${window.location.origin}/event/create`, {
                    eventName: eventName,
                    user_id: activeUserID,
                }).then(() => {
                    fetchData();
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const disableEvent = async (activeEventID) => {
        try {
            await axios.post(`${window.location.origin}/event/end`, {
                eventID: activeEventID
            }).then(() => {
                fetchData();
            });
        } catch (error) {
            console.log(error);
        }
    }

    function isUnder26Chars(str) {
        return str.length < 26;
    }

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: () => <div className="text-left">Event Name</div>,
            accessorKey: "event_name",
            cell: info => {
                const event = info.row.original;
                return (
                    <Link to={`/event/${event.event_id}/dashboard`}>
                        <ButtonPrimary variant="surface">{event.event_name}</ButtonPrimary>
                    </Link>
                );
            },
        },
        {
            header: () => <div className="text-left">Created</div>,
            accessorKey: "created",
            cell: info => {
                const date = new Date(info.getValue());
                return date.toLocaleDateString();
            },
        },
        {
            header: () => <div className="text-left">Active</div>,
            accessorKey: "is_active",
            cell: info => (
                <Badge color={info.getValue() ? "jade" : "orange"} variant="soft">
                    {info.getValue() ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
              const event = row.original
         
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ButtonPrimary variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </ButtonPrimary>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <AlertDialog>
                            <AlertDialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Delete</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your event!
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => removeEvent(event.event_name, event.user_id)}
                                >
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {disableEvent(event.event_id)}}
                    >
                      Toggle Active
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
                    {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
    ];

    let eventBoxes = eventData.map((event) => {
        return (
            <Box>
                <Card className="m-4">
                <Flex gap="3" align="center">
                    <DataList.Root>
                    <DataList.Item align="center">
                        <DataList.Label>Event Name</DataList.Label>
                        <DataList.Value>{event.event_name}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Active?</DataList.Label>
                        <DataList.Value>
                        <Badge color={event.is_active ? "jade" : "orange"} variant="soft">
                            {event.is_active ? "Active" : "Inactive"}
                        </Badge>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Created</DataList.Label>
                        <DataList.Value>{new Date(event.created).toLocaleDateString()}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Event Dashboard</DataList.Label>
                        <DataList.Value>
                        <Link to={`/event/${event.event_id}/dashboard`}>
                            <ButtonPrimary variant="ghost">{event.event_name}</ButtonPrimary>
                        </Link>
                        </DataList.Value>
                    </DataList.Item>
                    </DataList.Root>
                </Flex>
                </Card>
            </Box>
        );
    });

    return (
        <div className="justify-center items-center">
            {/* <Heading weight="bold" size="4" className="m-4">Dashboard</Heading> */}
            <div className="eventDashboard">
                <div className="m-4">
                    <Heading weight="regular" size="4">Create events</Heading>
                    <Separator size="3" className="mt-4 mb-4"/>
                    <Text>Event Name</Text>
                    <TextField.Root className="mt-1" value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="feed me..."></TextField.Root>
                    {!isUnder26Chars(eventName) && <Text className="mt-1">Please enter a name under 26 characters</Text>}
                    <ButtonPrimary disabled={!isUnder26Chars(eventName) || eventName === ''} onClick={addEvent} className="mt-4 mb-4" variant="soft"><b>Create Event</b></ButtonPrimary>
                </div>
                <div>
                    <Heading weight="regular" size="4" className="m-4">Past Events</Heading>
                    <Separator size="3" className="m-4"/>
                    {/* {eventBoxes.length === 0 ? <Spinner className="m-4"/> : eventBoxes} */}
                    <DataTable columns={columns} data={eventData}/>
                </div>
            </div>
        </div>
    );
};