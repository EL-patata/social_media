import { Axios } from 'axios';
import { X } from 'lucide-react';

export const axios = new Axios({
	baseURL: process.env.NEXT_PUBLIC_URL!,
});
