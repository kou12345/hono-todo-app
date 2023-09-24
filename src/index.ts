import {Hono} from 'hono';
import { Client } from '@neondatabase/serverless';
import { ExecutionContext } from 'hono/dist/types/context';
import {users} from './users/api';

export interface Bindings {
	DB_URL: string;
	ctx: ExecutionContext;
}

// @ts-ignore
const app = new Hono<{Bindings: Bindings}>();
app.route("/api/users", users);

export default app;
