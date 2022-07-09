import { Table, Tag, Button, Row, Col, Modal, Form, Input, DatePicker } from 'antd';
import React, { PureComponent } from 'react';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
	// eslint-disable-next-line
	class extends React.Component {
		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Modal visible={visible} title="入库信息" okText="提交" onCancel={onCancel} onOk={onCreate}>
					<Form layout="vertical">
						<Form.Item label="名称">
							{getFieldDecorator('title', {
								rules: [{ required: true, message: '请输入商品名称!' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="类型">{getFieldDecorator('description')(<Input type="textarea" />)}</Form.Item>
						<Form.Item label="型号">{getFieldDecorator('description')(<Input type="textarea" />)}</Form.Item>
						<Form.Item label="时间">{getFieldDecorator('date-time-picker', { rules: [{ type: 'object', required: true, message: 'Please select time!' }] })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}</Form.Item>
						<Form.Item label="描述">{getFieldDecorator('description')(<Input type="textarea" />)}</Form.Item>
					</Form>
				</Modal>
			);
		}
	}
);
const { Search } = Input;
export default class OutOfTheWarehouse extends PureComponent {
	state = {
		columns: [
			{
				title: '操作员',
				dataIndex: 'name',
				key: 'name',
				render: text => <a>{text}</a>,
				sorter: (a, b) => a.name.length - b.name.length
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
				title: '型号',
				dataIndex: 'Model',
				key: 'Model'
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
						<Button type="danger">出库</Button>
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
				Model: 'ADICK',
				tags: ['nice', 'developer']
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				address: 'London No. 1 Lake Park',
				Model: 'ADICK',
				tags: ['loser']
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				Model: 'ADICK',
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
						<Button type="primary" size="large" onClick={this.showModal}>
							入库
						</Button>
					</Col>
					<Col span={4}>
						<Search placeholder="搜索型号" enterButton="搜索" size="large" onSearch={value => console.log(value)} />
					</Col>
				</Row>
				<CollectionCreateForm wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />
				<Table columns={columns} dataSource={data} />
			</div>
		);
	}
}
