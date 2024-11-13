import { AdminAuthenticated, TaggedAction } from "../classes/ActionVariants";
export declare class AdminBroadcastUnitIndex extends AdminAuthenticated {
    constructor();
    runWithinTransaction({ connection, params, session }: {
        connection: any;
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            user: string;
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class AdminRoomIndex extends AdminAuthenticated {
    constructor();
    runWithinTransaction({ connection, params, session }: {
        connection: any;
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class AdminUserIndex extends AdminAuthenticated {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class AdminJamUnitIndex extends AdminAuthenticated {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            user: string;
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class AdminPacketStatIndex extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params, session }: {
        connection: any;
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            jamUnit: {
                name: string;
                gitHash: string;
            } | {
                name: string;
                gitHash?: undefined;
            };
            broadcastUnit: {
                name: string;
                lastSeenAt: number;
                macAddress: string;
                lanIp: string;
                wanIp: string;
                gitHash: string;
                upSince: Date;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            } | {
                name: string;
            };
            stats: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
import { AuthenticatedAction, TaggedAction } from "../classes/ActionVariants";
export declare class CreateBroadcastUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class BroadcastUnitPing extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        version: number;
        versions: any;
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class BroadcastUnitIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ connection, params, session }: {
        connection: any;
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class AcquireBroadcastUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class UpdateBroadcastUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class ReleaseBroadcastUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class RoomUpsert extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        room: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class BroadcastUnitDevReg extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        broadcastUnit: {
            name: string;
            lastSeenAt: number;
            macAddress: string;
            lanIp: string;
            wanIp: string;
            gitHash: string;
            upSince: Date;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class PacketStatCreate extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        packetstat: {
            stats: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class HappeningIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            description: string;
            isActive: Boolean;
            startAt: Date;
            endAt: Date;
            frequency: string;
            roomId: number;
            user: {
                name: string;
                firstName: string;
                lastName: string;
                email: string;
                defaultUnit: {};
                jamUnits: {
                    name: string;
                    lastSeenAt: number;
                    upSince: Date;
                    lanIp: string;
                    canTalkOnWebsocket: boolean;
                    macAddress: string;
                    gitHash: string;
                    settings: any;
                    chanOneIcon: number;
                    chanTwoIcon: number;
                    players: {
                        name: string;
                        clientId: number;
                        room: {
                            name: string;
                            port: number;
                            isActive: Boolean;
                            lastSeenAt: number;
                            lanIp: string;
                            playerCount: number;
                            roomToken: string;
                            wanIp: string;
                            city: string;
                            longitude: number;
                            latitude: number;
                            token: string;
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                status: string;
                lastActionAt: Date;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            roomToken: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class HappeningShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        happening: {
            room: {};
            rsvps: {
                message: string;
                canEdit: boolean;
                user: {
                    name: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    defaultUnit: {};
                    jamUnits: {
                        name: string;
                        lastSeenAt: number;
                        upSince: Date;
                        lanIp: string;
                        canTalkOnWebsocket: boolean;
                        macAddress: string;
                        gitHash: string;
                        settings: any;
                        chanOneIcon: number;
                        chanTwoIcon: number;
                        players: {
                            name: string;
                            clientId: number;
                            room: {
                                name: string;
                                port: number;
                                isActive: Boolean;
                                lastSeenAt: number;
                                lanIp: string;
                                playerCount: number;
                                roomToken: string;
                                wanIp: string;
                                city: string;
                                longitude: number;
                                latitude: number;
                                token: string;
                                id: any;
                                createdAt: Date;
                                updatedAt: Date;
                            };
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    status: string;
                    lastActionAt: Date;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            canEdit: boolean;
            canDelete: boolean;
            canRSVP: boolean;
            canJoin: boolean;
            name: string;
            description: string;
            isActive: Boolean;
            startAt: Date;
            endAt: Date;
            frequency: string;
            roomId: number;
            user: {
                name: string;
                firstName: string;
                lastName: string;
                email: string;
                defaultUnit: {};
                jamUnits: {
                    name: string;
                    lastSeenAt: number;
                    upSince: Date;
                    lanIp: string;
                    canTalkOnWebsocket: boolean;
                    macAddress: string;
                    gitHash: string;
                    settings: any;
                    chanOneIcon: number;
                    chanTwoIcon: number;
                    players: {
                        name: string;
                        clientId: number;
                        room: {
                            name: string;
                            port: number;
                            isActive: Boolean;
                            lastSeenAt: number;
                            lanIp: string;
                            playerCount: number;
                            roomToken: string;
                            wanIp: string;
                            city: string;
                            longitude: number;
                            latitude: number;
                            token: string;
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                status: string;
                lastActionAt: Date;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            roomToken: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class UpdateHappening extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        happening: {
            room: {
                name: string;
                port: number;
                isActive: Boolean;
                lastSeenAt: number;
                lanIp: string;
                playerCount: number;
                roomToken: string;
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            name: string;
            description: string;
            isActive: Boolean;
            startAt: Date;
            endAt: Date;
            frequency: string;
            roomId: number;
            user: {
                name: string;
                firstName: string;
                lastName: string;
                email: string;
                defaultUnit: {};
                jamUnits: {
                    name: string;
                    lastSeenAt: number;
                    upSince: Date;
                    lanIp: string;
                    canTalkOnWebsocket: boolean;
                    macAddress: string;
                    gitHash: string;
                    settings: any;
                    chanOneIcon: number;
                    chanTwoIcon: number;
                    players: {
                        name: string;
                        clientId: number;
                        room: {
                            name: string;
                            port: number;
                            isActive: Boolean;
                            lastSeenAt: number;
                            lanIp: string;
                            playerCount: number;
                            roomToken: string;
                            wanIp: string;
                            city: string;
                            longitude: number;
                            latitude: number;
                            token: string;
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                status: string;
                lastActionAt: Date;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            roomToken: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class DeleteHappening extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        status: string;
    }>;
}
export declare class CreateRSVP extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        rsvp: {
            message: string;
            canEdit: boolean;
            user: {
                name: string;
                firstName: string;
                lastName: string;
                email: string;
                defaultUnit: {};
                jamUnits: {
                    name: string;
                    lastSeenAt: number;
                    upSince: Date;
                    lanIp: string;
                    canTalkOnWebsocket: boolean;
                    macAddress: string;
                    gitHash: string;
                    settings: any;
                    chanOneIcon: number;
                    chanTwoIcon: number;
                    players: {
                        name: string;
                        clientId: number;
                        room: {
                            name: string;
                            port: number;
                            isActive: Boolean;
                            lastSeenAt: number;
                            lanIp: string;
                            playerCount: number;
                            roomToken: string;
                            wanIp: string;
                            city: string;
                            longitude: number;
                            latitude: number;
                            token: string;
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                status: string;
                lastActionAt: Date;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class DeleteRSVP extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        status: string;
    }>;
}
export declare class CreateHappening extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        happening: {
            name: string;
            description: string;
            isActive: Boolean;
            startAt: Date;
            endAt: Date;
            frequency: string;
            roomId: number;
            user: {
                name: string;
                firstName: string;
                lastName: string;
                email: string;
                defaultUnit: {};
                jamUnits: {
                    name: string;
                    lastSeenAt: number;
                    upSince: Date;
                    lanIp: string;
                    canTalkOnWebsocket: boolean;
                    macAddress: string;
                    gitHash: string;
                    settings: any;
                    chanOneIcon: number;
                    chanTwoIcon: number;
                    players: {
                        name: string;
                        clientId: number;
                        room: {
                            name: string;
                            port: number;
                            isActive: Boolean;
                            lastSeenAt: number;
                            lanIp: string;
                            playerCount: number;
                            roomToken: string;
                            wanIp: string;
                            city: string;
                            longitude: number;
                            latitude: number;
                            token: string;
                            id: any;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                status: string;
                lastActionAt: Date;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            roomToken: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
import { AuthenticatedAction, TaggedAction } from "../classes/ActionVariants";
export declare class CreateJamUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class AcquireJamUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class UpdateJamUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class ReleaseJamUnit extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class JamUnitPing extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        version: number;
        versions: any;
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class JamUnitIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ connection, session, params }: {
        connection: any;
        session: any;
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class JamUnitShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class JamUnitDevReg extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class CreatePedalBoard extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        pedalBoard: {
            name: string;
            description: string;
            program: number;
            shared: boolean;
            config: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class PedalBoardIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            user: {
                name: string;
                id: any;
            };
            name: string;
            description: string;
            program: number;
            shared: boolean;
            config: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class UpdatePedalBoard extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        pedalBoard: {
            name: string;
            description: string;
            program: number;
            shared: boolean;
            config: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class ShowPedalBoard extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        pedalBoard: {
            name: string;
            description: string;
            program: number;
            shared: boolean;
            config: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class DeletePedalBoard extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        status: string;
    }>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class PlayerIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            jamUnit: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            name: string;
            clientId: number;
            room: {
                name: string;
                port: number;
                isActive: Boolean;
                lastSeenAt: number;
                lanIp: string;
                playerCount: number;
                roomToken: string;
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class PlayerSettingIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            settings: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class PlayerSettingShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        playerSetting: {
            settings: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class PlayerSettingUpdate extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        playerSetting: {
            settings: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class CreateRecording extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        recording: {
            name: string;
            locationWav: string;
            locationOgg: string;
            metadata: any;
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class RecordingIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            locationWav: string;
            locationOgg: string;
            metadata: any;
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class RecordingShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params, session }: {
        params: any;
        session: any;
    }): Promise<{
        recording: any;
    }>;
}
export declare class DeleteRecording extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        status: string;
    }>;
}
import { AuthenticatedAction, TaggedAction } from "../classes/ActionVariants";
export declare class RoomIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class RoomShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        room: {
            players: {
                name: string;
                clientId: number;
                chanOneIcon: number;
                chanTwoIcon: number;
                token: string;
                city: string;
                longitude: number;
                latitude: number;
            }[];
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class JoinRoom extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        player: {
            name: string;
            clientId: number;
            room: {
                name: string;
                port: number;
                isActive: Boolean;
                lastSeenAt: number;
                lanIp: string;
                playerCount: number;
                roomToken: string;
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        room: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class DisconnectFromRoom extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class RoomPlayerList extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        players: number[];
    }>;
}
import { TaggedAction, AuthenticatedAction } from "../classes/ActionVariants";
export declare class SessionRegister extends TaggedAction {
    constructor();
    runWithinTransaction({ params }: {
        params: any;
    }): Promise<{
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class SessionLogin extends TaggedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        csrfToken: string;
    }>;
}
export declare class SessionProfile extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ connection }: {
        connection: any;
    }): Promise<{
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class ProfileUpdate extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ connection, params }: {
        connection: any;
        params: any;
    }): Promise<{
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class SessionLogout extends TaggedAction {
    constructor();
    runWithinTransaction({ connection }: {
        connection: any;
    }): Promise<{}>;
}
import { AuthenticatedAction } from "../classes/ActionVariants";
export declare class SongIndex extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        offset: any;
        limit: any;
        count: number;
        data: {
            canEdit: boolean;
            canDelete: boolean;
            name: string;
            artist: string;
            genre: string;
            tempo: number;
            info: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export declare class SongShow extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        song: {
            canEdit: boolean;
            canDelete: boolean;
            name: string;
            artist: string;
            genre: string;
            tempo: number;
            info: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class UpdateSong extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        song: {
            name: string;
            artist: string;
            genre: string;
            tempo: number;
            info: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export declare class DeleteSong extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        status: string;
    }>;
}
export declare class CreateSong extends AuthenticatedAction {
    constructor();
    runWithinTransaction({ session, params }: {
        session: any;
        params: any;
    }): Promise<{
        song: {
            name: string;
            artist: string;
            genre: string;
            tempo: number;
            info: any;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
import { Action, ParamsFrom } from "actionhero";
export declare class CreateChatRoom extends Action {
    name: string;
    description: string;
    inputs: {
        name: {
            required: true;
        };
    };
    run({ params }: {
        params: ParamsFrom<CreateChatRoom>;
    }): Promise<{
        name: string;
        didCreate: boolean;
    }>;
}
import { Action } from "actionhero";
declare enum StatusMessages {
    healthy = "Node Healthy",
    unhealthy = "Node Unhealthy"
}
export declare class Status extends Action {
    name: string;
    description: string;
    outputExample: {
        id: string;
        actionheroVersion: string;
        uptime: number;
    };
    run(): Promise<{
        id: string;
        actionheroVersion: string;
        name: string;
        description: string;
        version: string;
        uptime: number;
        component_versions: any;
        consumedMemoryMB: number;
        resqueTotalQueueLength: number;
        nodeStatus: StatusMessages;
        problems: string[];
    }>;
}
export {};
import { Action, RouteType } from "actionhero";
declare const responses: {
    200: {
        description: string;
    };
    400: {
        description: string;
    };
    404: {
        description: string;
    };
    422: {
        description: string;
    };
    500: {
        description: string;
    };
};
export declare class Swagger extends Action {
    name: string;
    description: string;
    outputExample: {};
    getLatestAction(route: RouteType): Action;
    buildSwaggerPaths(): {
        swaggerPaths: {
            [path: string]: {
                [method: string]: {
                    tags: string[];
                    summary: string;
                    consumes: string[];
                    produces: string[];
                    parameters: Array<{
                        in: string;
                        name: string;
                        type: string;
                        required: boolean;
                        default: string | number | boolean;
                    }>;
                    responses: typeof responses;
                    security: string[];
                };
            };
        };
        tags: string[];
    };
    run(): Promise<{
        swagger: string;
        info: {
            description: string;
            version: string;
            title: string;
            license: {
                name: string;
            };
        };
        host: string;
        basePath: string;
        schemes: string[];
        paths: {
            [path: string]: {
                [method: string]: {
                    tags: string[];
                    summary: string;
                    consumes: string[];
                    produces: string[];
                    parameters: Array<{
                        in: string;
                        name: string;
                        type: string;
                        required: boolean;
                        default: string | number | boolean;
                    }>;
                    responses: typeof responses;
                    security: string[];
                };
            };
        };
        securityDefinitions: {};
        externalDocs: {
            description: string;
            url: string;
        };
    }>;
}
export {};
import { ModelWithToken } from "../classes/BasicModel";
import { User } from "../models/User";
import { Room } from "./Room";
export declare class BroadcastUnit extends ModelWithToken<BroadcastUnit> {
    static version: number;
    name: string;
    macAddress: string;
    lanIp: string;
    wanIp: string;
    gitHash: string;
    userId: number;
    user: User;
    lastSeenAt: Date;
    upSince: Date;
    rooms: Room[];
    static myIpChanged(instance: any): Promise<void>;
    apiData(): {
        name: string;
        lastSeenAt: number;
        macAddress: string;
        lanIp: string;
        wanIp: string;
        gitHash: string;
        upSince: Date;
        token: string;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { Room } from "./Room";
import { RSVP } from "./RSVP";
import { User } from "./User";
export declare class Happening extends BasicModel<Happening> {
    name: string;
    description: string;
    isActive: Boolean;
    userId: number;
    user: User;
    roomId: number;
    room: Room;
    frequency: string;
    startAt: Date;
    endAt: Date;
    RSVPs: RSVP[];
    static deleteAnyRSVPs(instance: Happening): Promise<void>;
    apiData(): {
        name: string;
        description: string;
        isActive: Boolean;
        startAt: Date;
        endAt: Date;
        frequency: string;
        roomId: number;
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        roomToken: string;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { ModelWithLocation } from "../classes/BasicModel";
import { User } from "../models/User";
import { Player } from "./Player";
import { PedalBoard } from "./PedalBoard";
export declare class JamUnit extends ModelWithLocation<JamUnit> {
    static version: number;
    name: string;
    macAddress: string;
    lanIp: string;
    gitHash: string;
    canTalkOnWebsocket: boolean;
    userId: number;
    user: User;
    pedalBoardId: number;
    pedalBoard: PedalBoard;
    lastSeenAt: Date;
    upSince: Date;
    chanOneIcon: number;
    chanTwoIcon: number;
    get settings(): any;
    set settings(value: any);
    players: Player[];
    static deleteAnyPlayers(instance: JamUnit): Promise<void>;
    apiData(): {
        name: string;
        lastSeenAt: number;
        upSince: Date;
        lanIp: string;
        canTalkOnWebsocket: boolean;
        macAddress: string;
        gitHash: string;
        settings: any;
        chanOneIcon: number;
        chanTwoIcon: number;
        players: {
            name: string;
            clientId: number;
            room: {
                name: string;
                port: number;
                isActive: Boolean;
                lastSeenAt: number;
                lanIp: string;
                playerCount: number;
                roomToken: string;
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            };
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
        wanIp: string;
        city: string;
        longitude: number;
        latitude: number;
        token: string;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { JamUnit } from "./JamUnit";
import { BroadcastUnit } from "./BroadcastUnit";
export declare class PacketStat extends BasicModel<PacketStat> {
    broadcastUnitId: number;
    broadcastUnit: BroadcastUnit;
    jamUnitId: number;
    jamUnit: JamUnit;
    get stats(): any;
    set stats(value: any);
    apiData(): {
        stats: any;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { Recording } from "./Recording";
import { User } from "./User";
export declare class Participant extends BasicModel<Participant> {
    userId: number;
    user: User;
    recordingId: number;
    recording: Recording;
    static cleanUpRecordings(instance: any): Promise<void>;
    apiData(): {
        name: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        room: {
            name: string;
            locationWav: string;
            locationOgg: string;
            metadata: any;
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { User } from "./User";
import { JamUnit } from "./JamUnit";
export declare class PedalBoard extends BasicModel<PedalBoard> {
    static version: number;
    name: string;
    shared: boolean;
    description: string;
    program: number;
    userId: number;
    user: User;
    get config(): any;
    set config(value: any);
    jamUnits: JamUnit[];
    static deleteAnyJamUnitRefereces(instance: PedalBoard): Promise<void>;
    apiData(): {
        name: string;
        description: string;
        program: number;
        shared: boolean;
        config: any;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { JamUnit } from "./JamUnit";
import { Room } from "./Room";
export declare class Player extends BasicModel<Player> {
    name: string;
    roomId: number;
    room: Room;
    jamUnitId: number;
    jamUnit: JamUnit;
    clientId: number;
    apiData(): {
        name: string;
        clientId: number;
        room: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
    apiRoomData(): {
        jamUnit: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        name: string;
        clientId: number;
        room: {
            name: string;
            port: number;
            isActive: Boolean;
            lastSeenAt: number;
            lanIp: string;
            playerCount: number;
            roomToken: string;
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { JamUnit } from "./JamUnit";
import { User } from "./User";
export declare class PlayerSetting extends BasicModel<PlayerSetting> {
    userId: number;
    user: User;
    jamUnitId: number;
    jamUnit: JamUnit;
    get settings(): any;
    set settings(value: any);
    apiData(): {
        settings: any;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { Happening } from "./Happening";
import { User } from "./User";
export declare class RSVP extends BasicModel<RSVP> {
    message: string;
    happeningId: number;
    happening: Happening;
    userId: number;
    user: User;
    apiData(userId?: any): {
        message: string;
        canEdit: boolean;
        user: {
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            defaultUnit: {};
            jamUnits: {
                name: string;
                lastSeenAt: number;
                upSince: Date;
                lanIp: string;
                canTalkOnWebsocket: boolean;
                macAddress: string;
                gitHash: string;
                settings: any;
                chanOneIcon: number;
                chanTwoIcon: number;
                players: {
                    name: string;
                    clientId: number;
                    room: {
                        name: string;
                        port: number;
                        isActive: Boolean;
                        lastSeenAt: number;
                        lanIp: string;
                        playerCount: number;
                        roomToken: string;
                        wanIp: string;
                        city: string;
                        longitude: number;
                        latitude: number;
                        token: string;
                        id: any;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                wanIp: string;
                city: string;
                longitude: number;
                latitude: number;
                token: string;
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            status: string;
            lastActionAt: Date;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        };
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { HasStateMachine } from "../classes/HasStateMachine";
import { TransitionLog } from "./TransitionLog";
import { User } from "./User";
import { Participant } from "./Participant";
export declare class Recording extends HasStateMachine<Recording> {
    name: string;
    locationRaw: string;
    locationWav: string;
    get metadata(): any;
    set metadata(value: any);
    transitionLogs: TransitionLog[];
    participants: Participant[];
    users: Array<User & {
        Participant: Participant;
    }>;
    static setInitialValues(instance: Recording): Promise<void>;
    static cleanupFiles(instance: Recording): Promise<void>;
    getFsm(): Promise<any>;
    getRawPath(): string;
    getUrlPrefix(): string;
    apiData(): {
        name: string;
        locationWav: string;
        locationOgg: string;
        metadata: any;
        status: string;
        lastActionAt: Date;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { ModelWithLocation } from "../classes/BasicModel";
import { BroadcastUnit } from "./BroadcastUnit";
import { Player } from "./Player";
export declare class Room extends ModelWithLocation<Room> {
    name: string;
    broadcastUnitId: number;
    broadcastUnit: BroadcastUnit;
    port: number;
    lanIp: string;
    lastSeenAt: Date;
    isActive: Boolean;
    players: Player[];
    static deleteAnyPlayers(instance: Room): Promise<void>;
    isAvailable(params: any): boolean;
    getLocation(): string;
    apiData(): {
        name: string;
        port: number;
        isActive: Boolean;
        lastSeenAt: number;
        lanIp: string;
        playerCount: number;
        roomToken: string;
        wanIp: string;
        city: string;
        longitude: number;
        latitude: number;
        token: string;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
import { User } from "./User";
export declare class Song extends BasicModel<Song> {
    name: string;
    artist: string;
    genre: string;
    tempo: number;
    userId: number;
    user: User;
    get info(): any;
    set info(value: any);
    static cleanupLinks(instance: Song): Promise<void>;
    apiData(): {
        name: string;
        artist: string;
        genre: string;
        tempo: number;
        info: any;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { BasicModel } from "../classes/BasicModel";
export declare class TransitionLog extends BasicModel<TransitionLog> {
    fromState: string;
    toState: string;
    event: string;
    eventArgs: string;
    targetId: number;
    targetType: string;
    apiData(showArgs?: boolean): {
        fromState: string;
        toState: string;
        event: string;
        eventArgs: {};
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
import { HasStateMachine } from "../classes/HasStateMachine";
import { TransitionLog } from "./TransitionLog";
import { JamUnit } from "./JamUnit";
import { BroadcastUnit } from "./BroadcastUnit";
import { Participant } from "./Participant";
import { RSVP } from "./RSVP";
import { PedalBoard } from "./PedalBoard";
import { PlayerSetting } from "./PlayerSetting";
import { Recording } from "./Recording";
export declare class User extends HasStateMachine<User> {
    static saltRounds: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    status: string;
    RSVPs: RSVP[];
    jamUnits: JamUnit[];
    pedalBoards: PedalBoard[];
    playerSettings: PlayerSetting[];
    BroadcastUnits: BroadcastUnit[];
    participants: Participant[];
    recordings: Array<Recording & {
        Participant: Participant;
    }>;
    transitionLogs: TransitionLog[];
    static setInitialValues(instance: User): Promise<void>;
    static passwdChanged(instance: any): Promise<void>;
    getDisplayName(): string;
    getFsm(): Promise<any>;
    checkPassword(password: string): Promise<unknown>;
    isAdmin(): boolean;
    getDefaultUnit(): JamUnit;
    apiData(): {
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        defaultUnit: {};
        jamUnits: {
            name: string;
            lastSeenAt: number;
            upSince: Date;
            lanIp: string;
            canTalkOnWebsocket: boolean;
            macAddress: string;
            gitHash: string;
            settings: any;
            chanOneIcon: number;
            chanTwoIcon: number;
            players: {
                name: string;
                clientId: number;
                room: {
                    name: string;
                    port: number;
                    isActive: Boolean;
                    lastSeenAt: number;
                    lanIp: string;
                    playerCount: number;
                    roomToken: string;
                    wanIp: string;
                    city: string;
                    longitude: number;
                    latitude: number;
                    token: string;
                    id: any;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: any;
                createdAt: Date;
                updatedAt: Date;
            }[];
            wanIp: string;
            city: string;
            longitude: number;
            latitude: number;
            token: string;
            id: any;
            createdAt: Date;
            updatedAt: Date;
        }[];
        status: string;
        lastActionAt: Date;
        id: any;
        createdAt: Date;
        updatedAt: Date;
    };
}
