import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import swaggerDefinitions from '../../fixtures/swagger-definitions-allOfResolver.json';
import { resolveAllOf } from '../../../src/shared/helpers/allOfResolver';

chai.use(dirtyChai);

describe('allOfResolver', () => {
  it('allOfResolver', () => {
    const result = resolveAllOf(swaggerDefinitions);
    const items = result.StoredContainerCollection.properties.data.items;

    expect(items).to.be.instanceOf(Object);
    expect(items.allOf).to.not.exist();

    expect(items.properties).to.exist();
    expect(items.properties.id).to.exist();
    expect(items.properties.type).to.exist();
    expect(items.properties.innerDimensions).to.exist();
    expect(items.properties.outerDimensions).to.exist();
    expect(items.properties.maximumWeight).to.exist();
    expect(items.properties.tareWeight).to.exist();
    expect(items.properties.name).to.exist();

    expect(items.required).to.be.instanceOf(Array);
    expect(items.required).to.have.lengthOf(7);

    expect(items.type).to.equal('object');
  });
});
