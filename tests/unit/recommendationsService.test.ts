import { jest } from '@jest/globals';
import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import musicsBodyFactory from '../factories/musicsBodyFactory.js';

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
		const recommendation = {
			id: 1,
			name: 'Qualquer coisa',
			youtubeLink: 'https://google.com',
			score: -20
		};

		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);
		jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue();
		jest.spyOn(recommendationRepository, 'remove').mockResolvedValue();

		await recommendationService.downvote(recommendation.id);

		expect(recommendationRepository.updateScore).toBeCalledWith(recommendation.id, 'decrement');
		expect(recommendationRepository.remove).toBeCalledWith(recommendation.id);
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
    const musics = [
      {
        id: 1,
        name: "Chitãozinho E Xororó - Evidências",
        youtubeLink: "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
        score: 245
      },
      {
        id: 2,
        name: "STARSET - UNVEILING THE ARCHITECTURE",
        youtubeLink: "https://www.youtube.com/watch?v=qr4HxlCx4hA&list=PLFd7LxIsegi0E-QtSUV-INVojiEtPV8iI",
        score: 112
      }
    ]

		jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue('gt');
		jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue(musics);

		await recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalledTimes(1);
	});
});
