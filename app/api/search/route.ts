import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';

export const { GET } = createFromSource(source, {
  components: {
    tokenizer: createTokenizer({
      language: 'mandarin',
      stopWords: mandarinStopwords,
    }),
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
});
