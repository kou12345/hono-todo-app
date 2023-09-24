import { Hono } from 'hono';
import { ExecutionContext } from 'hono/dist/types/context';
import { users } from './users/api';

export type Bindings = {
	DB_URL: string;
	ctx: ExecutionContext;
};

const app = new Hono<{ Bindings: Bindings }>();
app.route('/api/users', users);

export default app;
