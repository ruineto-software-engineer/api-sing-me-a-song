import app from '../../src/app.js';
import supertest from 'supertest';
import { prisma } from '../../src/database.js';
import musicBodyFactory from '../factories/musicsBodyFactory.js';

describe('POST /recommendations tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 201 and persist the music given a valid body', async () => {
		const musics = musicBodyFactory();

		const response = await supertest(app).post('/recommendations').send(musics[0]);
		expect(response.status).toEqual(201);
	});

	it('should return 422 given an unnamed body', async () => {
		const musics = musicBodyFactory();

		const response = await supertest(app).post('/recommendations').send({
			youtubeLink: musics[0].youtubeLink
		});
		expect(response.status).toEqual(422);
	});

	it('should return 422 given a body with no youtubeLink', async () => {
		const musics = musicBodyFactory();

		const response = await supertest(app).post('/recommendations').send({
			name: musics[0].name
		});
		expect(response.status).toEqual(422);
	});

	it('should return 422 given an empty body', async () => {
		const musics = {};

		const response = await supertest(app).post('/recommendations').send(musics);
		expect(response.status).toEqual(422);
	});
});

describe('POST /recommendations/:id/upvote tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a valid recommendation', async () => {
		const musics = musicBodyFactory();

		const createdMusic = await prisma.recommendation.create({
			data: { ...musics[0] }
		});

		const response = await supertest(app).post(`/recommendations/${createdMusic.id}/upvote`);
		expect(response.status).toEqual(200);
	});
});

describe('POST /recommendations/:id/downvote tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a valid recommendation', async () => {
		const musics = musicBodyFactory();

		const createdMusic = await prisma.recommendation.create({
			data: { ...musics[0] }
		});

		const response = await supertest(app).post(`/recommendations/${createdMusic.id}/downvote`);
		expect(response.status).toEqual(200);
	});
});

describe('GET /recommendations tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a recommendations array', async () => {
		const musics = musicBodyFactory();

		await prisma.recommendation.create({
			data: { ...musics[0] }
		});

		const response = await supertest(app).get('/recommendations');
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body.length).not.toBeNull();
	});
});

describe('GET /recommendations/:id tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a valid recommendation', async () => {
		const musics = musicBodyFactory();

		const createdMusic = await prisma.recommendation.create({
			data: { ...musics[0] }
		});

		const response = await supertest(app).get(`/recommendations/${createdMusic.id}`);
		expect(response.body).toEqual(createdMusic);
	});
});

describe('GET /recommendations/random tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a score more or equal than 10', async () => {
		const musics = musicBodyFactory();

		const createdMusic = await prisma.recommendation.create({
			data: { ...musics[0], score: 245 }
		});

		const response = await supertest(app).get('/recommendations/random');
		expect(response.body).toEqual(createdMusic);
	});
});

describe('GET /recommendations/top/:amount tests', () => {
	beforeEach(truncateUsers);
	afterAll(disconnect);

	it('should return 200 given a set amount musics', async () => {
		const musics = musicBodyFactory();
		const amount = 3;

		await prisma.recommendation.createMany({
			data: [ { ...musics[0], score: 245 }, { ...musics[1] }, { ...musics[2] } ]
		});

		const response = await supertest(app).get(`/recommendations/top/${amount}`);
		expect(response.body.length).toBeGreaterThanOrEqual(amount);
	});
});

async function disconnect() {
	await prisma.$disconnect();
}

async function truncateUsers() {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}
