import { Table, Tag, Divider, Button, Row, Col, Modal, Form, Input, Radio } from 'antd';
import React, { PureComponent } from 'react';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
	// eslint-disable-next-line
	class extends React.Component {
		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Modal visible={visible} title="Create a new collection" okText="Create" onCancel={onCancel} onOk={onCreate}>
					<Form layout="vertical">
						<Form.Item label="Title">
							{getFieldDecorator('title', {
								rules: [{ required: true, message: 'Please input the title of collection!' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="Description">{getFieldDecorator('description')(<Input type="textarea" />)}</Form.Item>
						<Form.Item className="collection-create-form_last-form-item">
							{getFieldDecorator('modifier', {
								initialValue: 'public'
							})(
								<Radio.Group>
									<Radio value="public">Public</Radio>
									<Radio value="private">Private</Radio>
								</Radio.Group>
							)}
						</Form.Item>
					</Form>
				</Modal>
			);
		}
	}
);

export default class OutOfTheWarehouse extends PureComponent {
	state = {
		columns: [
			{
				title: '操作员',
				dataIndex: 'name',
				key: 'name',
				render: text => <a>{text}</a>
			},
			{
				title: '日期',
				dataIndex: 'age',
				key: 'age'
			},
			{
				title: '来源',
				dataIndex: 'address',
				key: 'address'
			},
			{
				title: '类型',
				key: 'tags',
				dataIndex: 'tags',
				render: (_, { tags }) => (
					<>
						{tags.map(tag => {
							let color = tag.length > 5 ? 'geekblue' : 'green';

							if (tag === 'loser') {
								color = 'volcano';
							}

							return (
								<Tag color={color} key={tag}>
									{tag.toUpperCase()}
								</Tag>
							);
						})}
					</>
				)
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<Button type="primary">操作</Button>
						<Divider type="vertical" />
						<Button type="danger">删除</Button>
					</span>
				)
			}
		],
		data: [
			{
				key: '1',
				name: 'John Brown',
				age: 32,
				address: 'New York No. 1 Lake Park',
				tags: ['nice', 'developer']
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				address: 'London No. 1 Lake Park',
				tags: ['loser']
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				address: 'Sidney No. 1 Lake Park',
				tags: ['cool', 'teacher']
			}
		],
		visible: false
	};
	showModal = () => {
		this.setState({ visible: true });
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};
	saveFormRef = formRef => {
		this.formRef = formRef;
	};
	handleCreate = () => {
		const { form } = this.formRef.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			console.log('Received values of form: ', values);
			form.resetFields();
			this.setState({ visible: false });
		});
	};
	render() {
		const { data, columns } = this.state;
		return (
			<div>
				<Row gutter={[4, 16]}>
					<Col span={2}>
						<Button type="primary" onClick={this.showModal}>
							商品录入
						</Button>
					</Col>
					<Col span={2}>
						<Button type="primary">入库</Button>
					</Col>
				</Row>
				<CollectionCreateForm wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />
				<Table columns={columns} dataSource={data} />
			</div>
		);
	}
}
