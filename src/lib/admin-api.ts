import axios from 'axios';
import { IEvent as IMongooseEvent } from '@/models/Event';
import { IInquiry } from '@/models/Inquiry';

export interface IEvent extends IMongooseEvent {
    ticketsSold?: number;
    capacity?: number;
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getEvents(): Promise<IEvent[]> {
    const { data } = await apiClient.get('/api/events');
    return data;
}

export async function getEvent(id: string): Promise<IEvent> {
    const { data } = await apiClient.get(`/api/events/${id}`);
    return data;
}

export async function createEvent(eventData: Partial<IEvent>): Promise<IEvent> {
    const { data } = await apiClient.post('/api/events', eventData);
    return data;
}

export async function updateEvent(id: string, eventData: Partial<IEvent>): Promise<IEvent> {
    const { data } = await apiClient.put(`/api/events/${id}`, eventData);
    return data;
}

export async function deleteEvent(id: string): Promise<void> {
    await apiClient.delete(`/api/events/${id}`);
}

export async function getInquiries(): Promise<IInquiry[]> {
    const { data } = await apiClient.get('/api/inquiries');
    return data;
}

export interface DashboardStats {
    users: number;
    events: number;
    inquiries: number;
    ticketsSold: number;
    totalVisits: number;
    eventsData?: IEvent[];
    recentInteractions: {
        _id: string;
        type: string;
        action: string;
        createdAt: string;
    }[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export async function getDashboardStats(page = 1, limit = 10): Promise<DashboardStats> {
    const { data } = await apiClient.get(`/api/admin/stats?page=${page}&limit=${limit}`);
    return data;
}

