import { jest } from '@jest/globals';
import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import musicsFactory from '../factories/musicsFactory.js';

describe('Recommendations Service test', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	it('should not found recommendation upvote', async () => {
		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

		expect(async () => {
			await recommendationService.upvote(1);
		}).rejects.toEqual({ message: '', type: 'not_found' });
	});

	it('should not found recommendation downvote', async () => {
		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

		expect(async () => {
			await recommendationService.downvote(1);
		}).rejects.toEqual({ message: '', type: 'not_found' });
	});

	it('should remove recommendation downvote', async () => {
		const recommendation = musicsFactory();

		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation[2]);
		jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue();
		jest.spyOn(recommendationRepository, 'remove').mockResolvedValue();

		await recommendationService.downvote(recommendation[2].id);

		expect(recommendationRepository.updateScore).toBeCalledWith(recommendation[2].id, 'decrement');
		expect(recommendationRepository.remove).toBeCalledWith(recommendation[2].id);
	});

	it('should not found recommendation getRandom', async () => {
		jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue('lte');
		jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);
		jest.spyOn(recommendationService, 'getByScore').mockResolvedValue([]);

		expect(async () => {
			await recommendationService.getRandom();
		}).rejects.toEqual({ message: '', type: 'not_found' });
	});

	it('should not found recommendation getRandom', async () => {
		const musics = musicsFactory();

		jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue('gt');
		jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue(musics);

		await recommendationService.getRandom();

		expect(recommendationRepository.findAll).toBeCalledTimes(1);
	});
});
