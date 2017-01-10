import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import qs from 'querystring';

import { fetchDefinition } from 'actions/definitionActions';

import { bindActionCreators } from 'redux';

import Header from 'component/Header';
import Drawer from 'component/Drawer';
import ApiDescriptionField from 'component/ApiDescriptionField';
import TaggedEntrypoints from 'container/TaggedEntrypoints';

import catalog from 'data/catalog.json';

import '../base.scss';

class BaseHandler extends Component {
  componentDidMount() {
    const { fetchDefinition } = this.props;
    const query = qs.parse(window.location.search.slice(1));
    const url = query.url || 'http://petstore.swagger.io/v2/swagger.json';
    fetchDefinition(url);
  }

  render () {
    const { definition } = this.props;
    const store = definition.store;
    const title = store.info ? store.info.title : '';
    const baseUrl = store.basePath ? store.basePath : '';
    const apiVersion = store.info ? store.info.version : '';
    const host = store.host ? store.host : '';
    const description = store.info ? store.info.description : '';

    return (
      <div className="app">
        <Header title={title} baseUrl={baseUrl} apiVersion={apiVersion} host={host} />
        <Drawer catalog={catalog} />
        <main className="main">
          <div className="container">
            <ApiDescriptionField description={description} />
            <TaggedEntrypoints className="apiContent" />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  definition: state.definition
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDefinition
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseHandler);
