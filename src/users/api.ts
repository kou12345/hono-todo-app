import {Hono} from 'hono';
import { Client } from '@neondatabase/serverless';

type User = {
	id: string;
	username: string;
	email: string;
	created_at: string;
	updated_at: string;
}

const users = new Hono();
users.get("/", async (c) => {
	try {
		const client = new Client(c.env?.DB_URL as string);
		await client.connect();
		// todo objectに代入したい
		const { rows } = await client.query('SELECT * FROM user;');
		c.executionCtx.waitUntil(client.end());

		const users = rows.map((row) => {
			return {
				id: row.id,
				username: row.username,
				email: row.email,
				created_at: row.created_at,
				updated_at: row.updated_at,
			} as User;
		});
		return new Response(JSON.stringify(users), {status: 200});

	// 	todo error handling
	} catch (e) {
		if (e instanceof Error) {
			return new Response(e.message, {status: 500})
		}
	}
})

export {users}
