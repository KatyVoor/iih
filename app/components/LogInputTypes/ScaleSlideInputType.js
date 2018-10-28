import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Slider from "react-native-slider";
import { IMAGES, COLOR } from '../Resources/constants';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const SELECTED_COLOR = COLOR.blue;
const TITLE = 'How intense is your pain?';
const imageChoices = [
  IMAGES.zero,
  IMAGES.one,
  IMAGES.two,
  IMAGES.three,
  IMAGES.four,
  IMAGES.five,
  IMAGES.six
];
const intensityColors = []; //find 10 colors that show intensity
//INTENSITY PAGE
export default class ScaleSlideInputType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title_text: props.title_text,
      value: props.value,
      max_val: props.max_val,
      scale_labels: props.scale_labels,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      selected: -1
    };
  }

  change(value) {
    console.log(value)
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
  }

  _renderBodyImageType() {
    let body = imageChoices.map((option, i) => {
      return (<TouchableOpacity
        key={i}
        onPress={() => {
          this.change(i);
          this.setState({ selected: i });
        }}
        style={[
          styles.button,
          {
            backgroundColor:
              this.state.selected == i ? SELECTED_COLOR : 'transparent'
          }
        ]}
      >
        <Image source={imageChoices[i]} style={styles.imgStyle} />
      </TouchableOpacity>
    )})

    return <View style={styles.body}>{body}</View>;
  }

  _renderBodyColorType() {}

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.questionText}>{this.props.question || TITLE}</Text>
        </View>
        {this._renderBodyImageType()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  button: {
    padding: 5,

    borderRadius: 50
  },
  questionText: {
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center'
  },
  imgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  body: {
    width: viewportWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40
  }
});

/*
<View style={this.state.input_style}>
  <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
  <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text>
  <Slider
    step={1}
    maximumValue={this.state.max_val}
    onValueChange={this.change.bind(this)}
    value={this.state.value}
  />
</View>

<View style={styles.wrapper}>
  <View style={styles.header}>
    <Text style={styles.questionText}>{this.props.question || TITLE}</Text>
  </View>
  {this._renderBodyImageType()}
</View>

<View style={this.state.input_style}>
  <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
  <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text>
  <Slider
    step={1}
    maximumValue={this.state.max_val}
    onValueChange={this.change.bind(this)}
    value={this.state.value}
    onSlidingStart={() => {
      this.props.onStart();
    }}
    onSlidingComplete={() =>
      {
        this.props.valueChange(this.props.val_label, this.state.value);
        this.props.onComplete()
      }}
  />
</View>

*/
