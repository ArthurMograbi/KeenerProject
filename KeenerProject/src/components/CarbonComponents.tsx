import * as React from "react";
import LogOut20 from "@carbon/icons-react/lib/logout/20";
import {
    Header,
    HeaderName,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    
} from "carbon-components-react/lib/components/UIShell";
import {
    DatePicker,
    DatePickerInput,
    TimePicker,
    TimePickerSelect,
    SelectItem,
    TextInput,
    Checkbox,
    Button
} from "carbon-components-react";
import {Link} from "react-router-dom";

// Alguns componentes reutilizaveis construidos usando Carbon

export class HeaderInCom extends React.Component<{ id?: string, className?: string }, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <Header aria-label="IBM Platform Name">
                    <HeaderName href="#" prefix="Mograbi">
                        <Link className="header-link" to="/home">Management</Link>
                    </HeaderName>
                    <HeaderNavigation aria-label="Mograbi Management">
                        <HeaderMenuItem href="#">
                            <Link className="header-link" to="/listagem_produtos">Produtos</Link>
                        </HeaderMenuItem>
                        <HeaderMenuItem href="#">
                            <Link className="header-link" to="/listagem_fluxos">Fluxos</Link>
                        </HeaderMenuItem>
                        <HeaderMenu aria-label="Registrar" menuLinkName="Registrar">
                            <HeaderMenuItem href="#">
                                <Link className="header-link" to="/registro_produtos">Registrar Produtos</Link>
                            </HeaderMenuItem>
                            <HeaderMenuItem href="#">
                                <Link className="header-link" to="/registro_fluxos">Registrar Fluxos</Link>
                            </HeaderMenuItem>
                        </HeaderMenu>
                    </HeaderNavigation>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="Log Out" onClick={() => { }}>
                            <Link className="header-link" to="/"><LogOut20 /></Link>
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            </div>
        );
    }
}

export class DatePickerIn extends React.Component<{ id?: string, className?: string, onChange?: Function }, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DatePicker datePickerType="single" id={this.props.id} className={this.props.className}>
                <DatePickerInput
                    id={this.props.id ? this.props.id + '-sub' : this.props.id}
                    onChange={this.props.onChange}
                    placeholder="mm/dd/yyyy"
                    labelText="Data do Fluxo"
                />
            </DatePicker>
        );
    }
}



export class TimePickerIn extends React.Component<{ id?: string, className?: string, onChange?: Function }, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <TimePicker onChange={this.props.onChange} id={this.props.id ? this.props.id + '-sub' : this.props.id}>
                    <TimePickerSelect onChange={this.props.onChange} id={this.props.id ? this.props.id + '-sub-select' : this.props.id} labelText="">
                        <SelectItem value="BRT" text="BRT" />
                        <SelectItem value="EST" text="EST" />
                    </TimePickerSelect>
                </TimePicker>
            </div>
        );
    }
}

export class TextInputIn extends React.Component<{ txt: string, id?: string, className?: string, onChange?: Function }, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <TextInput id={this.props.id ? this.props.id + '-sub' : this.props.id}
                    labelText={this.props.txt}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export class CheckBoxIn extends React.Component<{ txt: string, id?: string, className?: string, onChange?: Function}, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <fieldset id={this.props.id} className={this.props.className} >
                <Checkbox
                    labelText={this.props.txt}
                    id={this.props.id ? this.props.id + '-sub' : this.props.id}
                    onChange={this.props.onChange}
                />
            </fieldset>
        );
    }
}


export class ButtonIn extends React.Component<{type?:string, txt?: string, id?: string, className?: string, kind?: string, onClick?: Function, sent?: Boolean }, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button
                onClick={this.props.onClick}
                type = {this.props.type}
                kind={this.props.kind}
                id={this.props.sent ? this.props.id+'sent':this.props.id}
                className={this.props.className}>
                {this.props.txt}
            </Button>
        );
    }
}
