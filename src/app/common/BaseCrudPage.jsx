import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Page from "app/workspace/Page";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import Store from "robe-react-commons/lib/stores/Store";


export default class BaseCrudPage extends ShallowComponent {

    static propTypes: Map = {
        url: React.PropTypes.string,
        idField: React.PropTypes.string,
        columns: React.PropTypes.array,
        description: React.PropTypes.string,
        header: React.PropTypes.string,
    };

    constructor(props: Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: props.url
            }),
            idField: props.idField,
            autoLoad: true
        });

        this.state = {
            columns: props.columns,
            header: props.header,
            description: props.description,
            store: store,
            showModal: false,
            item: {}
        };
    }

    render(): Object {
        return (
            <Page description={this.state.description} header={this.state.header}>
                <DataGrid
                    toolbar={["create", "edit","delete"]}
                    columns={this.state.columns}
                    stores={[this.state.store]}
                    ref="table"
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    pageable={true}
                    editable={true}
                    pagination={{ pageSize: 50 }}
                />
                <ModalDataForm
                    ref="detailModal"
                    header={this.props.header}
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    item={this.state.item}
                    fields={this.state.columns}
                />
            </Page>
        );
    }

    __add = () => {
        let empty = {};
        this.__showModal(empty);
    };

    __edit = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel = () => {
        this.setState({showModal: false});
    };

    __onSave = (newData, callback) => {
        this.state.store.create(newData, callback(true));
    };

    __remove = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        this.state.store.delete(selectedRows[0]);
    };

    __showModal = (newItem) => {
        this.setState({showModal: true, item: newItem});
    };
}
